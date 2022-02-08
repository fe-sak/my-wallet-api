import db from '../databaseConnect.js';
import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';
import { transactionSchema } from '../schemas/transactionSchema.js';
import { idSchema } from '../schemas/idSchema.js';

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
  const income = req.body;
  income.value = parseFloat(income.value);

  const validate = transactionSchema.validate(income);
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
  const expense = req.body;
  expense.value = -1 * parseFloat(expense.value);

  const validate = transactionSchema.validate(expense);
  if (validate.error) {
    res
      .status(422)
      .send(validate.error.details.map((detail) => detail.message));
    return;
  }

  try {
    const user = res.locals.user;
    await db.collection('transactions').insertOne({
      ...expense,
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
  const { id } = req.params;

  const validate = idSchema.validate(id);
  if (validate.error) {
    res
      .status(422)
      .send(validate.error.details.map((detail) => detail.message));
    return;
  }
  try {
    const transaction = await db.collection('transactions').findOne({
      _id: new ObjectId(id),
    });

    if (!transaction) {
      res.sendStatus(404);
      return;
    }
    await db.collection('transactions').deleteOne({
      _id: new ObjectId(id),
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro interno do servidor');
  }
}

export async function editTransaction(req, res) {
  const newTransaction = req.body;
  newTransaction.value = parseFloat(newTransaction.value);

  const { id } = req.params;

  const validate = transactionSchema.validate(newTransaction);
  if (validate.error) {
    res
      .status(422)
      .send(validate.error.details.map((detail) => detail.message));
    return;
  }

  try {
    const oldTransaction = await db.collection('transactions').findOne({
      _id: new ObjectId(id),
    });

    if (!oldTransaction) {
      res.sendStatus(404);
      return;
    }

    if (oldTransaction.value < 0)
      newTransaction.value = newTransaction.value * -1;

    const updateDoc = {
      $set: {
        ...newTransaction,
      },
    };

    await db
      .collection('transactions')
      .updateOne({ _id: new ObjectId(id) }, updateDoc);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro interno do servidor');
  }
}
