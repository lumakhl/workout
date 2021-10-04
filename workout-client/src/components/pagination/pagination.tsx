import React, { Fragment, ReactElement, useContext } from 'react';
import { MAX_PAGE_SIZE } from '../../constants';
import {  WorkoutNavigationContext } from '../../contexts/workout-navigation-context';

import './pagination.css';

interface PaginationProps {
  page: number;
  total: number;
}

function Pagination(props: PaginationProps): ReactElement {
  const { page, total } = props;

  const context = useContext(WorkoutNavigationContext.context);

  const onNavigate = (page: number): void => {
    context.addOrUpdatePage(page);
  }

  const MAX_PAGES = Math.floor(total / MAX_PAGE_SIZE) - 1;
  const partial = MAX_PAGE_SIZE * (page + 1);

  const shouldRenderPrevious = page > 0;
  const shouldRenderNext = MAX_PAGES > page;

  return (
    <div className='c-pagination'>
      <div className='c-pagination__navs'>
        {shouldRenderPrevious ? (
          <Fragment>
            <button className='c-pagination__item' onClick={() => onNavigate(page - 1)}>
              Previous
            </button>
            <button className='c-pagination__item' onClick={() => onNavigate(page - 1)}>
              {page}
            </button>
          </Fragment>
        ) : null}

        <button className='c-pagination__item c-pagination__current'>{page+1}</button>

        {shouldRenderNext ? (
          <Fragment>
            <button className='c-pagination__item' onClick={() => onNavigate(page + 1)}>
              {page + 2}
            </button>
            <button className='c-pagination__item' onClick={() => onNavigate(page + 1)}>
              Next
            </button>
          </Fragment>
        ) : null}
      </div>
      <span className='c-pagination__total'>{`Total ${partial} of ${total}`}</span>
    </div>
  );
}

export default Pagination;
