import {Router}  from 'express';
import { makeResponse } from '../../lib';
import { saveRoadmap } from '../../services';

const router = Router();

router.post('/save', async(req, res) =>{
  try {
    const {name, description} = req.body;

    const roadmap = await saveRoadmap({name, description});

    return makeResponse(res, 200, true, 'Roadmap saved successfully', roadmap);
  } catch (error) {
    return makeResponse(res, 400, false, (error as Error).message);
  }
});

export const roadmapRouter = router;