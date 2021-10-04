import express from 'express';
import cors from 'cors';

import { Workout } from './model/workout';
import { loadDB } from './database';
import { isSameMonth } from './dateUtils';


const workouts = loadDB();

const app = express();

app.use(cors());

const PORT = 5000;
const PAGE_SIZE = 20;

app.get('/workouts', (req, res): void => {
  const { page, categories, month, limit = PAGE_SIZE } = req.query;

  const categoriesList = String(categories).split(',');
  const limitValue = Number(limit);
  const pageValue = Number(page);
  const monthValue = String(month);

  const workoutFiltered = workouts.filter(
    (workout: Workout) =>
      (!categories || categoriesList.includes(workout.category)) &&
      (!month || isSameMonth(new Date(monthValue), new Date(workout.startDate)))
  );

  const pageStart = pageValue * limitValue;
  const pageEnd = Math.min(pageStart + limitValue, workoutFiltered.length);

  const result = {
    workouts: workoutFiltered.slice(pageStart, pageEnd),
    total: workoutFiltered.length,
  };

  res.send(result);
});

app.get('/workout/:id', (req, res): void => {
  const { id } = req.params;
  const workout = workouts.find((workout: Workout) => workout.id === id);
  res.send(workout);
});

app.listen(PORT, () => {
  console.log('[server]: is running');
});
