import { Router } from 'express';
import {
  addExpense,
  addIncome,
  deleteTransaction,
  getUser,
} from '../controllers/userController.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const userRouter = Router();

userRouter.get('/transactions', validateTokenMiddleware, getUser);

userRouter.post('/income', validateTokenMiddleware, addIncome);

userRouter.post('/expense', validateTokenMiddleware, addExpense);

userRouter.delete(
  '/transactions/:id',
  validateTokenMiddleware,
  deleteTransaction
);

export default userRouter;
