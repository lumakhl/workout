import React, { ReactElement, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { WorkoutDetail } from '../../model';
import { getWorkoutDetail } from '../../service';
import { formattedDate } from '../../utils';

import './workout-detail-page.css';

const DATE_FORMAT = 'LLL';

function WorkoutDetailPage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<WorkoutDetail | null>(null);

  useEffect((): void => {
    getWorkoutDetail(id)
      .then((workout) => setWorkout(workout))
      .catch((err) => console.error(err));
  }, [id]);

  if (!workout) {
    return <div>There was an error fetching the workout. Try again later.</div>;
  }

  return (
    <div className='c-workout-detail-page'>
      <h2 className='c-workout-detail-page__name'>{workout.name}</h2>
      <img src={workout.image}></img>

      <div className='c-workout-detail-page__basic-info'>
        <div className='c-workout-detail-page__info'>
          <span className='c-workout-detail-page__info-title'>Category</span>
          <span className='c-workout-detail-page__text'>
            {workout.category}
          </span>
        </div>

        <div className='c-workout-detail-page__info'>
          <span className='c-workout-detail-page__info-title'>Start date</span>
          <span className='c-workout-detail-page__text'>
            {formattedDate(workout.startDate, DATE_FORMAT)}
          </span>
        </div>
      </div>

      <p className='c-workout-detail-page__description'>
        {workout.description}
      </p>
    </div>
  );
}

export default WorkoutDetailPage;
