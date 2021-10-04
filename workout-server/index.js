const express = require('express');
const cors = require('cors');

const { loadDB } = require('./database');
const { isSameMonth } = require('./dateUtils');

const workouts = loadDB();

const app = express();

app.use(cors());
app.options('*', cors());

const PORT = 5000;

const PAGE_SIZE = 20;

app.get('/workouts', (req, res) => {
  const { page, categories, month, limit = PAGE_SIZE } = req.query;

  const categoriesList = categories.split(',');
  const limitValue = Number(limit);

  const workoutFiltered = workouts.filter(
    (workout) =>
      (!categories || categoriesList.includes(workout.category)) &&
      (!month || isSameMonth(new Date(month), new Date(workout.startDate)))
  );

  const pageStart = page * limitValue;
  const pageEnd = Math.min(pageStart + limitValue, workoutFiltered.length);

  const result = {
    workouts: workoutFiltered.slice(pageStart, pageEnd),
    total: workoutFiltered.length,
  };

  res.send(result);
});

app.get('/workout/:id', (req, res) => {
  const { id } = req.params;
  const workout = workouts.find((workout) => workout.id === id);
  res.send(workout);
});

app.listen(PORT, () => {
  console.log('[server]: is running');
});
