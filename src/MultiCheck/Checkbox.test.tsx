import React from 'react';
import { mount } from 'enzyme';
import Checkbox from './Checkbox';
import MultiCheck from './MultiCheck'

describe('Checkbox', () => {
  const props = {
    label:'aaa',
    value:'111',
    onCheckboxChange:jest.fn(),
  };
  const multiCheckProps = {
    label: 'multiCheck',
    options: [
      {label: 'aaa', value: '111',},
      {label: 'bbb', value: '222',},
    ],
    columns: 2,
    onChange: jest.fn(),
  };

  it('checkbox use alone, without MultiCheck', () => {
    const wrapper = mount(<Checkbox {...props} />);

    expect(wrapper.find('input').prop('checked')).toBe(false);

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(props.onCheckboxChange).toHaveBeenCalled();
    expect(wrapper.find('input').prop('checked')).toBe(true);

    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(props.onCheckboxChange).toHaveBeenCalled();
    expect(wrapper.find('input').prop('checked')).toBe(false);
  });

  it('checkbox use with MultiCheck, select-all checkbox when check', () => {
    const multiCheckProps1 = Object.assign({},multiCheckProps,{
      values: ['111']
    })
    const wrapper = mount(<MultiCheck {...multiCheckProps1} />);
    wrapper.find('Checkbox').at(0).find('input').simulate('change', { target: { checked: true } });
    expect(multiCheckProps.onChange).toHaveBeenCalled();
    setTimeout(() => {
      expect(wrapper.find('Checkbox').at(0).find('input').prop('checked')).toBe(true);
    }, 500)
  });

  it('checkbox use with MultiCheck, select-all checkbox when uncheck', () => {
    const multiCheckProps2 = Object.assign({},multiCheckProps,{
      values: ['111','222']
    })
    const wrapper = mount(<MultiCheck {...multiCheckProps2} />);
    wrapper.find('Checkbox').at(0).find('input').simulate('change', { target: { checked: false } });
    expect(multiCheckProps.onChange).toHaveBeenCalled();
    setTimeout(() => {
      expect(wrapper.find('Checkbox').at(0).find('input').prop('checked')).toBe(false);
    }, 500)
  });

  it('checkbox use with MultiCheck, common checkbox when uncheck', () => {
    const multiCheckProps3 = Object.assign({},multiCheckProps,{
      values: []
    })
    const wrapper = mount(<MultiCheck {...multiCheckProps3} />);
    wrapper.find('Checkbox').at(1).find('input').simulate('change', { target: { checked: true } });
    expect(multiCheckProps.onChange).toHaveBeenCalled();
    setTimeout(() => {
      expect(wrapper.find('Checkbox').at(1).find('input').prop('checked')).toBe(true);
    }, 500)
  });

  it('checkbox use with MultiCheck, common checkbox when uncheck', () => {
    const multiCheckProps4 = Object.assign({},multiCheckProps,{
      values: ['222']
    })
    const wrapper = mount(<MultiCheck {...multiCheckProps4} />);
    wrapper.find('Checkbox').at(2).find('input').simulate('change', { target: { checked: false } });
    expect(multiCheckProps.onChange).toHaveBeenCalled();
    setTimeout(() => {
      expect(wrapper.find('Checkbox').at(2).find('input').prop('checked')).toBe(false);
    }, 500)
  });
});
