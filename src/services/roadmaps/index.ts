import { ROADMAP } from "../../models";

export const saveRoadmap = async (data: Object) =>
  new Promise((resolve, reject) => {
    const roadmap = new ROADMAP(data);
    roadmap.save()
      .then(resolve)
      .catch(reject);
  });
