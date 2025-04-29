import { Router } from 'express';
import { makeResponse } from '../../lib';
import { getUserProgress, saveUserProgress } from '../../services/user-progress';
import { getAllModules, getLevels, getNextModule, getTotalModules } from '../../services/levels';
import { ILevel, IUserProgress } from '../../lib/interface';
import { updateUserProgressValidation } from '../../middlewares';

const router = Router();

router.put('/update', updateUserProgressValidation, async (req, res) => {
  try {
    const { levelId, moduleIndex, completionStatus, timeSpent, userNotes, roadmapId } = req.body;

    await saveUserProgress({ _user: req.user._id, roadmapId, levelId, moduleIndex }, {
      _user: req.user._id,
      roadmapId,
      levelId,
      moduleIndex,
      completionStatus,
      timeSpent,
      userNotes
    }, { new: true, upsert: true });

    const allProgress = await getUserProgress({ _user: req.user._id }) as Array<IUserProgress>;
    const allLevels = await getLevels({ _roadmap: roadmapId, _id: levelId }) as Array<ILevel>;

    const levelModules = allLevels.flatMap(level => level.modules.map((mod: any, index: number) => ({
      levelId: level._id,
      moduleIndex: index
    })));

    const completedInLevel = allProgress.filter(p =>
      String(p.roadmapId) === String(roadmapId) && String(p.levelId) === String(levelId) && p.completionStatus).length; 

    const levelProgressPercent = Math.round((completedInLevel / levelModules.length) * 100);

    const totalModules = await getAllModules({ _roadmap: roadmapId });
    const totalCompleted = allProgress.filter(p => String(roadmapId) === String(p.roadmapId) && p.completionStatus).length;
    const overallProgressPercent = Math.round((totalCompleted / totalModules.length) * 100);

    const nextModule = getNextModule(levelId, moduleIndex, totalModules);


    return makeResponse(res, 200, true, 'User progress updated successfully', {
      progress: {
        levelProgress: `${levelProgressPercent}%`,
        roadmapProgress: `${overallProgressPercent}%`,
        nextModule: nextModule || null,
        timestamp: new Date()
      }
    });
  } catch (error) {
    return makeResponse(res, 400, false, (error as Error).message);
  }
});

export const userProgressRouter = router;