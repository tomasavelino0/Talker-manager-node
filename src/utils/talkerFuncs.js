const fs = require('fs').promises;
const { join } = require('path');
const crypto = require('crypto');

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

const generateToken = () => crypto.randomBytes(8).toString('hex');

const createNewTalker = async (talker) => {
  const allTalkers = await readTalkers();
  const newTalker = { id: allTalkers.length + 1, ...talker };
  allTalkers.push(newTalker);
  await fs.writeFile(join(__dirname, PATH_NAME), JSON.stringify(allTalkers));
  return newTalker;
};

const updateTalker = async (id, talker) => {
  const allTalkers = await readTalkers();
  const index = allTalkers.findIndex((person) => person.id === id);
  allTalkers[index] = { id, ...talker };
  await fs.writeFile(join(__dirname, PATH_NAME), JSON.stringify(allTalkers));
  return allTalkers[index];
};

const deleteTalkerById = async (id) => {
  const allTalkers = await readTalkers();
  const index = allTalkers.findIndex((talker) => talker.id === id);
  allTalkers.splice(index, 1);
  await fs.writeFile(join(__dirname, PATH_NAME), JSON.stringify(allTalkers));
};

const querySearch = async (query) => {
  const allTalkers = await readTalkers();
  const lowerQuery = query;
  const search = allTalkers.filter((person) =>
    person.name.toLowerCase().includes(lowerQuery));
  return search;
};

module.exports = {
    readTalkers,
    readTalkerById,
    generateToken,
    createNewTalker,
    updateTalker,
    deleteTalkerById,
    querySearch,
};