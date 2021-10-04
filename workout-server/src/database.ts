import faker from 'faker';
import * as fs from 'fs';
import { Category } from './model/category';
import { Workout } from './model/workout';

const DB_NAME = 'workouts_db.txt';
const DATA_SIZE = 1000;

function createDB(): Workout[] {
  const workouts:Workout[] = [];
  for(let i = 0; DATA_SIZE > i; i++) {
    const workout: Workout = {
      name: faker.lorem.word(),
      description: faker.lorem.paragraphs(2),
      category: faker.random.arrayElement(Object.getOwnPropertyNames(Category)) as Category,
      startDate: faker.date.future(),
      image: faker.image.sports(1000, 400),
      id: faker.datatype.uuid()
    };

    workouts.push(workout);
  }

  return workouts;
}

function loadDB(): Workout[] {
  if(!fs.existsSync(DB_NAME)) {
    const workouts = createDB();

    fs.writeFileSync(DB_NAME, JSON.stringify(workouts));

    return workouts;
  }

  const workouts = fs.readFileSync(DB_NAME).toString();
  return JSON.parse(workouts);
}

export {
  loadDB
}