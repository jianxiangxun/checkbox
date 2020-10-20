
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';

import MultiCheckContext from './MultiCheckContext';
import {CheckboxProps} from '../types/multiCheck';

const Checkbox: React.FC<CheckboxProps> = (props:CheckboxProps) =>{
  const {
    label,
    value,
    checked,
    selectAllFlag,
    ...rest
  } = props;
  const {
    values,
    options,
    onChange,
  } = useContext(MultiCheckContext);

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    // select all checkout
    if(selectAllFlag){
      onChange(event.target.checked?options:[])
    }
    else{
      // checked, push value into array
      let arrAfterAdd = [...values].concat(event.target.value);
      // unchecked, delete from array
      let arrAfterDelete = [...values].filter(item => item!==event.target.value);

      let nextValueArr = event.target.checked?arrAfterAdd:arrAfterDelete;
      // values -> options, for setState
      let nextOptions = options.filter(item=>nextValueArr.includes(item.value));

      onChange(nextOptions);
    }
      
  };
  return (
    <label
      className='CheckboxLabel'
    >
      <input
        type='checkbox'
        {...rest}
        checked={checked}
        onChange={handleChange}
        value={value}
      />
      {<span>{label}</span>}
    </label>
      )
}

export default Checkbox;