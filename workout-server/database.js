const faker = require('faker');
const fs = require('fs');

const DB_NAME = 'workouts_db.txt';
const DATA_SIZE = 1000;

const CATEGORIES = ['C1', 'C2', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'];

function createDB() {
  const workouts = [];
  for(let i = 0; DATA_SIZE > i; i++) {
    const workout = {
      name: faker.lorem.word(),
      description: faker.lorem.paragraphs(2),
      category: faker.random.arrayElement(CATEGORIES),
      startDate: faker.date.soon(),
      image: faker.image.sports(1000, 400),
      id: faker.datatype.uuid()
    };

    workouts.push(workout);
  }

  return workouts;
}

function loadDB() {
  if(!fs.existsSync(DB_NAME)) {
    const workouts = createDB();

    fs.writeFileSync(DB_NAME, JSON.stringify(workouts));

    return workouts;
  }

  const workouts = fs.readFileSync(DB_NAME);
  return JSON.parse(workouts);
}

module.exports = {
  loadDB
}