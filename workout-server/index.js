const express = require('express');
const cors = require('cors');

const { loadDB } = require('./database');

const workouts = loadDB();

const app = express();

app.use(cors());
app.options('*', cors());

const PORT = 5000;

const PAGE_SIZE = 20;

app.get('/workouts/:page', (req, res) => {
  const { page } = req.params;

  const pageStart = page*PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, workouts.length);

  const result = {
    workouts: workouts.slice(pageStart, pageEnd),
    total: workouts.length,
  }

  res.send(result);
});

app.get('/workout/:id', (req, res) => {
  const { id } = req.params;
  const workout = workouts.find((workout) => workout.id === id);
  res.send(workout);
});

app.listen(PORT, () => {
  console.log('[server]: is running');
})


