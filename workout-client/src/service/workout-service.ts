import axios from 'axios';
import { FiltersOptions } from '../components/workout-list/components/topbar/topbar';
import { MAX_PAGE_SIZE } from '../constants';
import { WorkoutDetail, Workouts } from '../model';

const DEV_SERVER = 'http://localhost:5000';

const getWorkouts = async (
  filterOptions: FiltersOptions
): Promise<Workouts> => {
  const params = new URLSearchParams([
    ['page', String(filterOptions.page)],
    ['categories', filterOptions.selectedCategories.join(',')],
    ['month', filterOptions.selectedMonth],
    ['limit', String(MAX_PAGE_SIZE)]
  ]);
  const workouts = await axios.get<Workouts>(
    `${DEV_SERVER}/workouts`,
    { params }
  );
  return workouts.data;
};

const getWorkoutDetail = async (workoutId: string): Promise<WorkoutDetail> => {
  const workoutDetail = await axios.get<WorkoutDetail>(
    `${DEV_SERVER}/workout/${workoutId}`
  );
  return workoutDetail.data;
};

export { getWorkouts, getWorkoutDetail };
