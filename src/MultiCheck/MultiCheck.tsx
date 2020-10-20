import React from 'react';

import './MultiCheck.css';

import Checkbox from './Checkbox';
import MultiCheckContext from './MultiCheckContext';

import {Option, Props, MultiCheckContextValue} from '../types/multiCheck';
/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    label,
    options,
    columns,
    values,
    onChange,
  } = props;
  const baseStyle = {
    display:'inline-grid',
    gridTemplateColumns:`repeat(${columns||2}, 1fr)`,
    gridColumnGap:'20px',
    gridRowGap:'10px',
  };
  const selectAllCheckboxProps = {
    label:'Select All',
    value:'',
    checked:values.length===options.length,
    selectAllFlag:true,
  };
  const contextValue:MultiCheckContextValue = {
    values,
    options,
    onChange
  };
  return (
    <MultiCheckContext.Provider value={contextValue}>
      <div className='MultiCheck' style={baseStyle}>
        <Checkbox {...selectAllCheckboxProps}></Checkbox>
        {
          options.map((item,index)=>{
            const checkboxProps = Object.assign({},item,{
              key:index,
              checked:values.includes(item.value),
            })
            return <Checkbox {...checkboxProps}></Checkbox>
          })
        }
      </div>
    </MultiCheckContext.Provider>
  )
}

export {Option};
export default MultiCheck;
