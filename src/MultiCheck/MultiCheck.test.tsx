import React from 'react';
import { mount } from 'enzyme';
import MultiCheck from './MultiCheck'

describe('MultiCheck', () => {
  const multiCheckProps = {
    label: 'multiCheck',
    options: [
      {label: 'aaa', value: '111',},
      {label: 'bbb', value: '222',},
    ],
    columns: 2,
    onChange: jest.fn(),
  };

  it('all other checkbox checked, select-all checkbox auto checked', () => {
    const multiCheckProps1 = Object.assign({},multiCheckProps,{
      values: ['222']
    })
    const wrapper = mount(<MultiCheck {...multiCheckProps1} />);
    wrapper.find('Checkbox').at(1).find('input').simulate('change', { target: { checked: true } });
    setTimeout(() => {
      expect(wrapper.find('Checkbox').at(0).find('input').prop('checked')).toBe(true);
    }, 500)
  });

  it('when all checkbox checked, uncheck a common checkbox, select-all checkbox auto unchecked', () => {
    const multiCheckProps2 = Object.assign({},multiCheckProps,{
      values: ['111','222']
    })
    const wrapper = mount(<MultiCheck {...multiCheckProps2} />);
    wrapper.find('Checkbox').at(1).find('input').simulate('change', { target: { checked: false } });
    setTimeout(() => {
      expect(wrapper.find('Checkbox').at(0).find('input').prop('checked')).toBe(false);
    }, 500)
  });

  it('when select-all checkbox checked, all other checkbox auto checked', () => {
    const multiCheckProps3 = Object.assign({},multiCheckProps,{
      values: []
    })
    const wrapper = mount(<MultiCheck {...multiCheckProps3} />);
    wrapper.find('Checkbox').at(0).find('input').simulate('change', { target: { checked: true } });
    setTimeout(() => {
      expect(wrapper.find('Checkbox').at(1).find('input').prop('checked')).toBe(true);
      expect(wrapper.find('Checkbox').at(2).find('input').prop('checked')).toBe(true);
    }, 500)
  });

  it('when select-all checkbox unchecked, all other checkbox auto unchecked', () => {
    const multiCheckProps4 = Object.assign({},multiCheckProps,{
      values: ['111','222']
    })
    const wrapper = mount(<MultiCheck {...multiCheckProps4} />);
    wrapper.find('Checkbox').at(0).find('input').simulate('change', { target: { checked: false } });
    setTimeout(() => {
      expect(wrapper.find('Checkbox').at(1).find('input').prop('checked')).toBe(false);
      expect(wrapper.find('Checkbox').at(2).find('input').prop('checked')).toBe(false);
    }, 500)
  });
});