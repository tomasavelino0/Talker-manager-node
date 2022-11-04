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

module.exports = {
    validadeTalkers,
};
