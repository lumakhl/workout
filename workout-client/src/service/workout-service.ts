import axios from 'axios';
import { WorkoutDetail, Workouts } from '../model';

const DEV_SERVER = 'http://localhost:5000';

const getWorkouts = async (page: number): Promise<Workouts> => {
  const workouts = await axios.get<Workouts>(`${DEV_SERVER}/workouts/${page}`);
  return workouts.data;
};

const getWorkoutDetail = async (workoutId: string): Promise<WorkoutDetail> => {
  const workoutDetail = await axios.get<WorkoutDetail>(
    `${DEV_SERVER}/workout/${workoutId}`
  );
  return workoutDetail.data;
};

export { getWorkouts, getWorkoutDetail };
