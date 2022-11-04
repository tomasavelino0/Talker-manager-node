const fs = require('fs').promises;
const { join } = require('path');

const PATH_NAME = '../talker.json';

const readTalkers = async () => {
  const allTalkers = await fs.readFile(join(__dirname, PATH_NAME), 'utf-8');
  return JSON.parse(allTalkers);
};

const readTalkerById = async (id) => {
  const allTalkers = await readTalkers();
  const talkerById = allTalkers.find((talker) => talker.id === id);
  return talkerById;
};

module.exports = {
    readTalkers,
    readTalkerById,
};