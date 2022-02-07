import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import db from '../databaseConnect.js';
import { userSchema } from '../routes/schemas/userSchema.js';

export async function login(req, res) {
  const { email, password } = req.body;

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
}

export async function signUp(req, res) {
  const user = req.body;

  if (user.confirmPassword) {
    delete user.confirmPassword;
  }

  const validate = userSchema.validate(user, { abortEarly: false });
  if (validate.error) {
    res
      .status(422)
      .send(validate.error.details.map((detail) => detail.message));
    return;
  }

  try {
    const isCreated = await db
      .collection('users')
      .findOne({ email: user.email });
    if (isCreated) {
      res.status(409).send('Email já cadastrado');
      return;
    }
    await db.collection('users').insertOne({
      ...user,
      password: bcrypt.hashSync(user.password, parseInt(process.env.SALT)),
    });
  } catch {
    res.status(500).send('Erro interno do servidor');
  }

  res.sendStatus(201);
}
