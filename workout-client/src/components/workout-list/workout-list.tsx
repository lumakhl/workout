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
const NOT_FOUND_MESSAGE = 'No workout was found';

function WorkoutList(): ReactElement {
  const context = useContext(WorkoutNavigationContext.context);

  const [filterOptions, setFilterOptions] = useState<FiltersOptions>(
    context.getFilterOptions()
  );
  const [workouts, setWorkouts] = useState<Workouts>({
    total: 0,
    workouts: [],
  });
  const [loading, setLoading] = useState<boolean>();

  const currentPage = filterOptions?.page || 0;

  useEffect(() => {
    const unlistenFilterOptions = context.addFilterOptionsListener(() => {
      setFilterOptions(context.getFilterOptions());
    });

    return () => {
      unlistenFilterOptions();
    };
  }, []);

  useEffect((): void => {
    setLoading(true);
    updateWorkouts();
  }, [filterOptions]);

  const updateWorkouts = (): void => {
    getWorkouts(filterOptions)
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const shouldRenderPagination = !loading && workouts.total >= MAX_PAGE_SIZE;

  const renderContent = (): ReactElement[] | ReactElement => {
    if (workouts.total) {
      return workouts.workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ));
    }

    return (
      <span className='c-workout-list__not-found'>{NOT_FOUND_MESSAGE}</span>
    );
  };

  return (
    <div className='c-workout-list'>
      <Topbar title={TOPBAR_TITLE} />
      {loading ? <span>Loading...</span> : renderContent()}
      {shouldRenderPagination ? (
        <Pagination page={currentPage} total={workouts.total} />
      ) : null}
    </div>
  );
}

export default WorkoutList;
