/**
 * 下拉选择框
 */

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import './style';

class Option extends React.Component {
  render() {
    const { value, children } = this.props;
    return <option value={value}>{children}</option>
  }
}

class Select extends React.Component {

  static Option = Option;

  // 
  handleChange() {

  }

  render() {
    const { data = [], name, value, className } = this.props;
    let cls = classnames('rc-smart-select', className);
    return (
      <select className={cls} name={name} value={value} onChange={this.handleChange.bind(this)}>
        {this.props.children}
        {
          data.map((item) => {
            let value = item.value;
            let desc = item.desc;
            return <option value={value}>{desc}</option>;
          })
        }
      </select>
    );
  }
}

// <Select data={[ { value: 123, desc: '项目一' } ]}></Select>
// <Select http={{ url: 'xxx', param: null }} keys={[ 'value', 'desc' ]}></Select>
export default Select;