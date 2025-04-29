import { Router } from 'express';
import { userProgressRouter } from '../controllers';
import { authenticate } from '../middlewares/auth';
import { authRouter } from '../controllers/users';
import { levelRouter } from '../controllers/levels';
import { roadmapRouter } from '../controllers/roadmaps';

const router = Router();

router.use('/auth', authRouter);
router.use('/roadmaps', authenticate, roadmapRouter);
router.use('/levels', authenticate, levelRouter);
router.use('/user-progress', authenticate, userProgressRouter);

export { router };