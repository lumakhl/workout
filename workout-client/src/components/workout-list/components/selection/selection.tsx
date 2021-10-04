import React, { ReactElement } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';

import './selection.css';

export interface OptionType {
  label: string;
  value: string;
}

interface SelectionProps {
  selectedValues?: OptionType | OptionType[];
  multiselect?: boolean;
  name: string;
  options: OptionType[];
  onChangeMulti?: (value: string[]) => void;
  onChangeSingle?: (value: string) => void;
}

function Selection(props: SelectionProps): ReactElement {
  const { multiselect = false, name, onChangeMulti, onChangeSingle, options, selectedValues } = props;

  const onChangeSelection = (value: SingleValue<OptionType> | MultiValue<OptionType> ): void => {
    if(Array.isArray(value)) {
      if(onChangeMulti) {
        const options = Object.values(value).map((option: OptionType) => option.value) || [];
        return onChangeMulti(options);
      }
    }

    if(onChangeSingle) {
      const option = value as OptionType;
      onChangeSingle(option?.value || '');
    }
  } 

  return (
    <div className="c-selection">
      <span className="c-selection__title">{ name }</span>
      <Select
        isClearable
        isMulti={multiselect}
        name={name}
        options={options}
        className='basic-multi-select'
        classNamePrefix='select'
        value={selectedValues}
        onChange={onChangeSelection}
      />
    </div>
  );
}

export default Selection;
