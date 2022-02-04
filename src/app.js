import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(5000, () => console.log('Server listening on port 5000'));
