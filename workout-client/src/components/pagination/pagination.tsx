import React, { Fragment, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { MAX_PAGE_SIZE } from '../../constants';

import './pagination.css';

interface PaginationProps {
  page: number;
  total: number;
}

function Pagination(props: PaginationProps): ReactElement {
  const { page, total } = props;

  const MAX_PAGES = Math.floor(total / MAX_PAGE_SIZE) - 1;
  const partial = MAX_PAGE_SIZE * (page + 1);

  const shouldRenderPrevious = page > 0;
  const shouldRenderNext = MAX_PAGES > page;

  return (
    <div className='c-pagination'>
      <div className='c-pagination__navs'>
        {shouldRenderPrevious ? (
          <Fragment>
            <Link className='c-pagination__item' to={`/${page - 1}`}>
              Previous
            </Link>
            <Link className='c-pagination__item' to={`/${page - 1}`}>
              {page - 1}
            </Link>
          </Fragment>
        ) : null}

        <span className='c-pagination__item c-pagination__current'>{page}</span>

        {shouldRenderNext ? (
          <Fragment>
            <Link className='c-pagination__item' to={`/${page + 1}`}>
              {page + 1}
            </Link>
            <Link className='c-pagination__item' to={`/${page + 1}`}>
              Next
            </Link>
          </Fragment>
        ) : null}
      </div>
      <span className='c-pagination__total'>{`Total ${partial} of ${total}`}</span>
    </div>
  );
}

export default Pagination;
