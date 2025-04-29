import { Router } from 'express';
import { makeResponse } from '../../lib';
import { saveLevel, saveRoadmap } from '../../services';
import { saveRoadMapValidation } from '../../middlewares/joi-validations';

const router = Router();

router.post('/save', saveRoadMapValidation, async (req, res) => {
  try {
    const { levelNumber, levelName, modules, roadmapId } = req.body;    

    const roadmap = await saveLevel({ _roadmap: roadmapId, levelNumber },{
      _roadmap: roadmapId,
      levelNumber,
      levelName,
      modules
    }, { new: true, upsert: true });    

    return makeResponse(res, 200, true, 'Level saved successfully', roadmap);
  } catch (error) {
    return makeResponse(res, 400, false, (error as Error).message);
  }
});

export const levelRouter = router;