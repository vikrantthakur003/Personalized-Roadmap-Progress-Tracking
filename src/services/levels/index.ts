import { ILevel } from "../../lib";
import { ROADMAP } from "../../models";
import { LEVEL } from "../../models/levels";

export const saveLevel = async (search: Object, update: Object, options: Object = { new: true, upsert: true }) =>
  new Promise((resolve, reject) => {
    LEVEL.findOneAndUpdate(search, update, options)
      .then(resolve)
      .catch(reject)
  });

export const getTotalModules = async () => {
  try {
    const totalModules = await ROADMAP.aggregate([
      { $unwind: "$modules" },
      { $count: "total" }
    ]);

    return totalModules[0].total;
  } catch (error) {
    throw error;
  }
};

export const getLevels = async (search: Object, projections: Object = {}, options: Object = {}) =>
  new Promise((resolve, reject) => {
    LEVEL.find(search, projections, options)
      .then(resolve)
      .catch(reject);
  });

export const getAllModules = async (search: Object) => {
  try {
    const allLevels: Array<ILevel> = await LEVEL.find(search);
    return allLevels.flatMap(level => level.modules.map((mod: any, index: number) => ({
      levelId: level._id,
      moduleIndex: index + 1
    })));

  } catch (error) {
    throw error;
  }
};

export const getNextModule = (currentLevel: number, currentIndex: number, allModules: any[]) => {
  const flatList = allModules.sort((a, b) =>
    a.levelId - b.levelId || a.moduleIndex - b.moduleIndex
  );
  
  const currentIndexInList = flatList.findIndex(
    m => String(m.levelId) === String(currentLevel) && m.moduleIndex === currentIndex
  );  

  if (currentIndexInList !== -1 && currentIndexInList < flatList.length - 1) {
    return flatList[currentIndexInList + 1];
  }

  return null;
};
