import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, makeResponse } from '../../lib';
import { getUser, saveUser } from '../../services/users';
import { userLoginValidation, userRegistrationValidation } from '../../middlewares';

const router = Router();

router.post('/register', userRegistrationValidation, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserExits = await getUser({ email, status: 'ACTIVE' });

    if (isUserExits) {
      throw new Error('User already exists');
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await saveUser({ name, email, password: hashPassword });

    return makeResponse(res, 200, true, 'User registered successfully', user);
  } catch (error) {
    return makeResponse(res, 400, false, (error as Error).message);
  }
});

router.post('/login', userLoginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUser({ email, status: 'ACTIVE' }) as IUser;

    if (!user) {
      throw new Error('User not found');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Password Incorrect');
    }

    const token = jwt.sign({ _id: user._id }, String(process.env.JWT_SECRET), { algorithm: 'HS256', expiresIn: '7d' });

    return makeResponse(res, 200, true, 'User logged in successfully', token);
  } catch (error) {
    return makeResponse(res, 400, false, (error as Error).message);
  }
});

export const authRouter = router;