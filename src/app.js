import express from 'express';
import cors from 'cors';
import { login, signUp } from './controllers/authController.js';
import { readUser } from './controllers/userController.js';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(5000, () => console.log('Server listening on port 5000'));

app.post('/login', login);

app.post('/signup', signUp);

app.get('/balance', readUser);
