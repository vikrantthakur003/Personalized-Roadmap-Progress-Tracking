import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { makeResponse } from '../../lib';

export const saveRoadMapValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = Joi.object({
    roadmapId: Joi.string()
      .required(),
    levelNumber: Joi.number()
      .required(),
    levelName: Joi.string()
      .required(),
    modules: Joi.array()
      .items({
        moduleIndex: Joi.number()
          .required(),
        title: Joi.string()
          .required(),
        description: Joi.string()
          .required()
      })
      .required()
  })
    .validate(req.body);

  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};


export const updateUserProgressValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = Joi.object({
    levelId: Joi.string()
      .required(),
    roadmapId: Joi.string()
      .required(),
    moduleIndex: Joi.number()
      .required(),
    completionStatus: Joi.boolean()
      .required(),
    timeSpent: Joi.number()
      .required(),
    userNotes: Joi.string()
      .required()
  })
    .validate(req.body);

  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};

export const userRegistrationValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = Joi.object({
    name: Joi.string()
      .required(),
    email: Joi.string()
      .required(),
    password: Joi.string()
      .required()
  })
    .validate(req.body);

  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};

export const userLoginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = Joi.object({
    email: Joi.string()
      .required(),
    password: Joi.string()
      .required()
  })
    .validate(req.body);

  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};