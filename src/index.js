const express = require('express');
const bodyParser = require('body-parser');
const { readTalkers, 
  readTalkerById, 
  generateToken, 
  createNewTalker,
  updateTalker,
  deleteTalkerById, 
  querySearch } = require('./utils/talkerFuncs');

const { validadeTalkers,
  validadePassWord, validadeEmail, validateToken,
  validateAge,
  validateWatchedAt,
  validateRate,
  validadeTalk,
  validateName } = require('./midlewares/talkerMidleWares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
//

app.post('/login', validadeEmail, validadePassWord, (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

app.get('/talker/search',
validateToken, async (req, res, _next) => {
  const quer = req.query.q;
  console.log(quer);
  if (!quer || quer === '') {
    return res.status(200).json(await readTalkers());
  }
  const allTalkers = await querySearch(quer.toLowerCase());
  return res.status(200).json(allTalkers);
});

app.get('/talker', validadeTalkers, async (req, res) => {
  const allTalker = await readTalkers();
  res.status(200).json(allTalker);
});

app.get('/talker/:id', async (req, res) => {
  const id = Number(req.params.id);
  const talker = await readTalkerById(id);
  if (talker) {
    return res.status(200).json(talker);
  }
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/talker',
validateToken,
validadeTalk,
validateName,
validateAge,
validateWatchedAt,
validateRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = await createNewTalker({ name, age, talk });
  res.status(201).json(talker);
});

app.put('/talker/:id',
validateToken,
validadeTalk,
validateName,
validateAge,
validateWatchedAt,
validateRate, async (req, res, _next) => {
  const { id } = req.params;
  const talkerInfo = req.body;
  const talker = await updateTalker(Number(id), talkerInfo);
  return res.status(200).json(talker);
});

app.delete('/talker/:id',
validateToken, async (req, res, _next) => {
  const { id } = req.params;
  await deleteTalkerById(Number(id));
  res.status(204).end();
});

module.exports = app;