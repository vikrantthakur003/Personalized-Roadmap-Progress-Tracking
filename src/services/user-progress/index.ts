import { USER_PROGRESS } from "../../models";

export const saveUserProgress = async (search: Object, update: Object, options: Object = { new: true, upsert: true }) =>
  new Promise((resolve, reject) => {
    USER_PROGRESS.findOneAndUpdate(search, update, options)
      .then(resolve)
      .catch(reject);
  });

export const getUserProgress = async (search: Object, projections: Object = {}, options: Object = {}) =>
  new Promise((resolve, reject) => {
    USER_PROGRESS.find(search)
      .then(resolve)
      .catch(reject);
  });