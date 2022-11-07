const fs = require('fs').promises;
const { join } = require('path');

const PATH_NAME = '../talker.json';

const validadeTalkers = async (_req, res, next) => {
    const allTalker = await fs.readFile(join(__dirname, PATH_NAME), 'utf-8');
    if (allTalker) {
      return next();
    }
   return res.status(200).json([]);
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
   return next();
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
   return next();
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
  return next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16 || typeof authorization !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  return next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  const maiorIdade = 18;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < maiorIdade) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  return next();
};

const validadeTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) { 
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  return next();
};

const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const validDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/([12][0-9]{3})$/;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!validDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (Number.isInteger(rate) === false || rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

module.exports = {
    validadeTalkers,
    validadeLoginBody,
    validadeEmail,
    validadePassWord,
    validateToken,
    validateAge,
    validateWatchedAt,
    validateRate,
    validadeTalk,
    validateName,
};
