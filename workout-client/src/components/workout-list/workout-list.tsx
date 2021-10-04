import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { MAX_PAGE_SIZE } from '../../constants';

import { Workouts } from '../../model';
import { getWorkouts } from '../../service';

import Pagination from '../pagination/pagination';
import WorkoutItem from '../workout-item/workout-item';

import Topbar, { FiltersOptions } from './components/topbar/topbar';
import { WorkoutNavigationContext } from '../../contexts/workout-navigation-context';

import './workout-list.css';

const TOPBAR_TITLE = 'Filters';

function WorkoutList(): ReactElement {
  const context = useContext(WorkoutNavigationContext.context);
  // const [context] = useState<WorkoutListContext>(new WorkoutListContext());

  const [filterOptions, setFilterOptions] = useState<FiltersOptions>();
  const [workouts, setWorkouts] = useState<Workouts>({
    total: 0,
    workouts: [],
  });

  const currentPage = filterOptions?.page || 0;

  useEffect(() => {
    const unlistenFilterOptions = context.addFilterOptionsListener(() => {
      setFilterOptions(context.getFilterOptions());
    });

    setFilterOptions(context.getFilterOptions());

    return () => {
      unlistenFilterOptions();
    };
  }, []);

  useEffect((): void => {
    updateWorkouts();
  }, [filterOptions]);

  const updateWorkouts = (): void => {
    console.log(filterOptions);
    getWorkouts(currentPage)
      .then((data) => setWorkouts(data))
      .catch();
  };

  const shouldRenderPagination = workouts.total >= MAX_PAGE_SIZE;

  return (
    <div className='c-workout-list'>
      <Topbar title={TOPBAR_TITLE} />
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
