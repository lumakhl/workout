import React, { ReactElement, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { MAX_PAGE_SIZE } from '../../constants';

import { Workouts } from '../../model';
import { getWorkouts } from '../../service';

import Pagination from '../pagination/pagination';
import WorkoutItem from '../workout-item/workout-item';

import Topbar, { FiltersSelected } from './components/topbar/topbar';

import './workout-list.css';

const TOPBAR_TITLE = 'Filters';

function WorkoutList(): ReactElement {
  const { page } = useParams<{ page?: string }>();
  const [workouts, setWorkouts] = useState<Workouts>({
    total: 0,
    workouts: [],
  });

  const currentPage = Number(page) || 0;

  useEffect((): void => {
    updateWorkouts();
  }, []);

  useEffect((): void => {
    updateWorkouts();
  }, [page]);

  const updateWorkouts = (): void => {
    getWorkouts(currentPage)
      .then((data) => setWorkouts(data))
      .catch();
  };

  const onFilterChange = (filterOptions: FiltersSelected): void => {
    console.log(filterOptions);
  }

  const shouldRenderPagination = workouts.total >= MAX_PAGE_SIZE;

  return (
    <div className='c-workout-list'>
      <Topbar onChange={onFilterChange} title={TOPBAR_TITLE}/>
      {workouts.workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}
      {shouldRenderPagination ? (
        <Pagination page={currentPage} total={workouts.total} />
      ) : null}
    </div>
  );
}

export default WorkoutList;
