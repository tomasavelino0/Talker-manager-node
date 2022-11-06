const fs = require('fs').promises;
const { join } = require('path');
const crypto = require('crypto');

const PATH_NAME = '../talker.json';
let idTalker = 5;

const readTalkers = async () => {
  const allTalkers = await fs.readFile(join(__dirname, PATH_NAME), 'utf-8');
  return JSON.parse(allTalkers);
};

const readTalkerById = async (id) => {
  const allTalkers = await readTalkers();
  const talkerById = allTalkers.find((talker) => talker.id === id);
  return talkerById;
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

const createNewTalker = async (talker) => {
  const allTalkers = await readTalkers();
  const newTalker = { id: idTalker, ...talker };
  allTalkers.push(newTalker);
  await fs.writeFile(join(__dirname, PATH_NAME), JSON.stringify(allTalkers));
  idTalker += 1;
  console.log(newTalker);
  return newTalker;
};

module.exports = {
    readTalkers,
    readTalkerById,
    generateToken,
    createNewTalker,
};