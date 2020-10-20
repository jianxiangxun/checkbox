/* istanbul ignore file */
import React from 'react';

import {MultiCheckContextValue, Option} from '../types/multiCheck';

export default React.createContext<MultiCheckContextValue>({
  values: [],
  options: [],
  onChange: (options: Option[]): void =>{},
});


