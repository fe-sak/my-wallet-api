import { Router } from 'express';
import { addIncome, getUser } from '../controllers/userController.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const userRouter = Router();

userRouter.get('/transactions', validateTokenMiddleware, getUser);

userRouter.post('/income', addIncome);

export default userRouter;
