import { Category } from './category';

interface Workout {
  name: string;
  description: string,
  category: Category,
  startDate: Date,
  image: string,
  id: string,
}

export {
  Workout
}