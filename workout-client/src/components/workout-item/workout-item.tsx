import React, { ReactElement } from 'react';

import { Link } from 'react-router-dom';

import { Workout } from '../../model';
import { formattedDate } from '../../utils';

import './workout-item.css';

interface WorkoutProps {
  workout: Workout;
}

const DATE_FORMAT = 'lll';

function WorkoutItem(props: WorkoutProps): ReactElement {
  const { workout } = props;

  return (
    <Link className='c-workout-item' to={`/workout/${workout.id}`}>
      <div className='c-workout-item__info c-workout-item__info-name'>
        <span className='c-workout-item__info-title'>Name</span>
        <span className='c-workout-item__name c-workout-item__text'>
          {workout.name}
        </span>
      </div>

      <div className='c-workout-item__info'>
        <span className='c-workout-item__info-title'>Category</span>
        <span className='c-workout-item__text'>{workout.category}</span>
      </div>

      <div className='c-workout-item__info'>
        <span className='c-workout-item__info-title'>Start date</span>
        <span className='c-workout-item__text'>
          {formattedDate(workout.startDate, DATE_FORMAT)}
        </span>
      </div>
    </Link>
  );
}

export default WorkoutItem;
