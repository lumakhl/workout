import moment from 'moment';
import React, { ReactElement, useEffect, useState } from 'react';
import { Categories } from '../../../../model';
import Selection, { OptionType } from '../selection/selection';

import './topbar.css';

interface TopbarProps {
  onChange: (filters: FiltersSelected) => void;
  title: string;
}

export interface FiltersSelected {
  selectedCategories: string[];
  selectedMonth: string;
}

function Topbar(props: TopbarProps): ReactElement {
  const { onChange, title} = props;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect((): void => {
    onChange({selectedCategories, selectedMonth});
  }, [selectedCategories, selectedMonth]);

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
      setSelectedCategories(value);
  };

  const onMonthSelectedChange = (value: string): void => {
    setSelectedMonth(value);
  };

  return (
    <div className='c-topbar'>
      <span className='c-topbar__title'>{title}</span>
      <Selection multiselect name='Category' options={categories} onChangeMulti={onCategoriesSelectedChange}/>
      <Selection name='Start Date' options={getMonths()} onChangeSingle={onMonthSelectedChange} />
    </div>
  );
}

export default Topbar;
