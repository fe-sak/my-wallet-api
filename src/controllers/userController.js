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
  const bodySchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().max(40).required(),
  });
  const income = req.body;
  income.value = parseFloat(income.value);

  const validate = bodySchema.validate(income);
  if (validate.error) {
    res
      .status(422)
      .send(validate.error.details.map((detail) => detail.message));
    return;
  }

  try {
    const user = res.locals.user;
    await db.collection('transactions').insertOne({
      ...income,
      userId: user._id,
      date: dayjs().format('DD/MM'),
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro interno do servidor');
  }
}

export async function addExpense(req, res) {
  const bodySchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().max(40).required(),
  });
  const income = req.body;
  income.value = -1 * parseFloat(income.value);

  const validate = bodySchema.validate(income);
  if (validate.error) {
    res
      .status(422)
      .send(validate.error.details.map((detail) => detail.message));
    return;
  }

  try {
    const user = res.locals.user;
    await db.collection('transactions').insertOne({
      ...income,
      userId: user._id,
      date: dayjs().format('DD/MM'),
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro interno do servidor');
  }
}

export async function deleteTransaction(req, res) {
  const bodySchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().max(40).required(),
  });
  const income = req.body;
  income.value = parseFloat(income.value);

  const validate = bodySchema.validate(income);
  if (validate.error) {
    res
      .status(422)
      .send(validate.error.details.map((detail) => detail.message));
    return;
  }

  try {
    const user = res.locals.user;
    await db.collection('transactions').insertOne({
      ...income,
      userId: user._id,
      date: dayjs().format('DD/MM'),
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro interno do servidor');
  }
}
