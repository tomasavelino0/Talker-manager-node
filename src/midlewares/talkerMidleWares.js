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

const validadeLoginBody = async (req, _res, next) => {
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

module.exports = {
    validadeTalkers,
    validadeLoginBody,
};
