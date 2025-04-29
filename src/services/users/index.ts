import { USER } from "../../models";

export const saveUser = async (data: Object) =>
  new Promise((resolve, reject) => {
    const user = new USER(data);
    user.save()
      .then(resolve)
      .catch(reject);
  });

export const getUser = async (search: Object, projections: Object = {}, options: any = {}) =>
  new Promise((resolve, reject) => {
    USER.findOne(search, projections, options)
      .then(resolve)
      .catch(reject);
  });