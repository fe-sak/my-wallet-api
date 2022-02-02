import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.listen(5000, () => console.log('Server listening on port 5000'));

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect().then(() => {
  db = mongoClient.db('MyWallet');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  try {
    const user = await db.collection('users').findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = v4();

      await db.collection('sessions').insertOne({ token, userId: user._id });
      res.send(token);
      return;
    } else {
      res.sendStatus(401);
      return;
    }
  } catch (error) {
    res.status(500).send('Erro interno do servidor');
  }
});

app.post('/signup', async (req, res) => {
  const user = req.body;
  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string(),
  });

  if (user.confirmPassword) {
    delete user.confirmPassword;
  }

  const validate = userSchema.validate(user, { abortEarly: false });
  if (validate.error) {
    res.status(422).send(validate.error.details.map((detail) => detail.message));
    return;
  }

  try {
    const isCreated = await db.collection('users').findOne({ email: user.email });
    if (isCreated) {
      res.status(409).send('Email já cadastrado');
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro interno do servidor');
  }

  try {
    await db.collection('users').insertOne({
      ...user,
      password: bcrypt.hashSync(user.password, parseInt(process.env.SALT)),
    });
  } catch (error) {
    console.log(error);
  }

  res.sendStatus(201);
});
