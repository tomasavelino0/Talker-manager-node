const fs = require('fs').promises;
const { join } = require('path');

const PATH_NAME = '../talker.json';

const validadeTalkers = async (_req, res, next) => {
    const allTalker = await fs.readFile(join(__dirname, PATH_NAME), 'utf-8');
    if (allTalker) {
      return next();
    }
    res.status(200).json([]);
};

const validadeLoginBody = (req, _res, next) => {
  const propriedadesBody = ['email', 'password'];
  const loginBody = req.body;
  const hasProperties = propriedadesBody.every((propriedade) => propriedade in loginBody);
  if (!hasProperties) {
    const error = {
      statusCode: 400,
      message: 'Propriedades faltando',
    };
    return next(`Error ${error.statusCode}, ${error.message}`);
  }
   next();
};

const validEmail = (email) => {
  const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regex.test(email);
};

const validadeEmail = (req, res, next) => {
  const { email } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validadePassWord = (req, res, next) => {
  const validPassWord = 6;
  const { password } = req.body;
  if (password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < validPassWord) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
    validadeTalkers,
    validadeLoginBody,
    validadeEmail,
    validadePassWord,
};
