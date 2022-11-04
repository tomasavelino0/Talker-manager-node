const express = require('express');
const bodyParser = require('body-parser');
const { readTalkers } = require('./utils/talkerFuncs');
const { validadeTalkers } = require('./midlewares/talkerMidleWares');

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

app.get('/talker', validadeTalkers, async (req, res) => {
  const allTalker = await readTalkers();
  res.status(200).json(allTalker);
});

module.exports = app;