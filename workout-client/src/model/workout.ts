import { Categories } from './categories';

export interface Workout {
  category: Categories;
  id: string;
  name: string;
  startDate: Date;
}

export interface WorkoutDetail extends Workout {
  description: string;
  image: string;
}

export interface Workouts {
  workouts: Workout[];
  total: number;
}
