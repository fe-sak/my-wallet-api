import db from '../databaseConnect.js';

export async function readUser(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) return res.sendStatus(401);

  try {
    const session = await db.collection('sessions').findOne({ token });

    if (!session) return res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro interno do servidor');
  }
}
