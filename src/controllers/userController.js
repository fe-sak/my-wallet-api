import Joi from 'joi';
import db from '../databaseConnect.js';
import dayjs from 'dayjs';

export async function getUser(req, res) {
  try {
    const user = res.locals.user;
    const transactions = await db
      .collection('transactions')
      .find({ userId: user._id })
      .toArray();

    transactions.forEach((transaction) => delete transaction.userId);
    delete user._id;
    res.send({ user, transactions });
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro interno do servidor');
  }
}

export async function addIncome(req, res) {
  const { authorization } = req.headers;
  const income = req.body;

  const token = authorization?.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);

  const bodySchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().max(40).required(),
  });

  const validate = bodySchema.validate(income);
  if (validate.error) {
    res
      .status(422)
      .send(validate.error.details.map((detail) => detail.message));
    return;
  }

  try {
    const session = await db.collection('sessions').findOne({ token });
    if (!session) return res.sendStatus(401);

    const user = await db.collection('users').findOne({ _id: session.userId });
    if (!user) return res.sendStatus(401);
    await db.collection('transactions').insertOne({
      ...income,
      userId: user._id,
      date: dayjs().format('DD/MM'),
    });

    res.sendStatus(201);
  } catch {
    res.status(500).send('Erro interno do servidor');
  }
}

export async function addExpense(req, res) {}
