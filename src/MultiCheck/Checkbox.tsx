import React, {
  useCallback,
  useContext,
  useState,
} from 'react';

import 'pretty-checkbox/dist/pretty-checkbox.css';

import MultiCheckContext from './MultiCheckContext';
import {CheckboxProps} from '../types/multiCheck';

const Checkbox: React.FC<CheckboxProps> = (props:CheckboxProps) =>{
  const {
    label,
    value,
    checked,
    selectAllFlag,
    onCheckboxChange,
    ...rest
  } = props;
  const {
    values,
    options,
    onChange,
  } = useContext(MultiCheckContext);
  const [checkedWhenUseSelf, setCheckedWhenUseSelf] = useState<boolean>(false);
  // useCallback avoid unnecessary executions or renders
  const handleChange = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
    //use alone, without MultiCheck 
    if(checked===undefined){
      setCheckedWhenUseSelf(event.target.checked);
      onCheckboxChange&&onCheckboxChange(event);
      return;
    }
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
  },[values, onChange]);
  return (
    <div className="checkbox pretty p-svg p-rotate">
      <input
        type='checkbox'
        checked={checked===undefined?checkedWhenUseSelf:checked}
        onChange={handleChange}
        value={value}
        {...rest}
      />
      <div className="state  p-primary">
          <svg className="svg svg-icon" viewBox="0 0 20 20">
              <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style={{'stroke': 'white','fill':'white',}}></path>
          </svg>
          <label>{label}</label>
      </div>
    </div>
  )
}
Checkbox.displayName = 'Checkbox';
export default Checkbox;