import moment from 'moment';
import React, { ReactElement, useContext } from 'react';
import { Categories } from '../../../../model';
import { WorkoutNavigationContext } from '../../../../contexts/workout-navigation-context';
import Selection, { OptionType } from '../selection/selection';

import './topbar.css';

interface TopbarProps {
  title: string;
}

export interface FiltersOptions {
  selectedCategories: string[];
  selectedMonth: string;
  page: number;
}

const FILTER_CATEGORY_TITLE = 'Categories';
const FILTER_MONTH_TITLE = 'Start Date';

function Topbar(props: TopbarProps): ReactElement {
  const { title } = props;

  const context = useContext(WorkoutNavigationContext.context);

  const categories = Object.entries(Categories).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const getMonths = (): OptionType[] => {
    const months = [];
    for (let i = 0; i <= 12; i++) {
      const date = moment().add(i, 'months');
      months.push({ value: date.format(), label: date.format('MMMM') });
    }

    return months;
  };

  const onCategoriesSelectedChange = (value: string[]): void => {
    context.addOrUpdateFilterOptions({
      ...context.getFilterOptions(),
      selectedCategories: value,
      page: 0,
    });
  };

  const onMonthSelectedChange = (value: string): void => {
    context.addOrUpdateFilterOptions({
      ...context.getFilterOptions(),
      selectedMonth: value,
      page: 0,
    });
  };

  return (
    <div className='c-topbar'>
      <span className='c-topbar__title'>{title}</span>
      <Selection
        multiselect
        name={FILTER_CATEGORY_TITLE}
        options={categories}
        onChangeMulti={onCategoriesSelectedChange}
      />
      <Selection
        name={FILTER_MONTH_TITLE}
        options={getMonths()}
        onChangeSingle={onMonthSelectedChange}
      />
    </div>
  );
}

export default Topbar;
