/**
 * 下拉选择框
 */

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import http from 'utils/http';
import './style';

class Option extends React.Component {
  render() {
    const { value, children } = this.props;
    return <option value={value}>{children}</option>
  }
}

class Select extends React.Component {

  static Option = Option;

  state = {
    data: this.props.data || []
  };

  // change 事件
  handleChange = this.props.onChange;

  componentDidMount() {
    if (this.props.http) {
      this.request(this.props.http);
    }
  }

  request(options) {
    http({
      ...options,
      onSuccess: (data) => {
        this.setState({
          data: data.data
        });
      }
    });
  }

  render() {
    const { name, value, className, keys = ['value', 'desc'] } = this.props;
    const { data } = this.state;

    let cls = classnames('rc-smart-select', className);
    // console.log(this.props.children)
    return (
      <select className={cls} name={name} value={value} onChange={this.handleChange}>
        {this.props.children}
        {
          data.map((item, index) => {
            let value = item[ keys[0] ];
            let desc = item[ keys[1] ];
            return <option key={index} value={value}>{desc}</option>;
          })
        }
      </select>
    );
  }
}

// <Select data={[ { value: 123, desc: '项目一' } ]}></Select>
// <Select http={{ url: 'xxx', param: null }} keys={[ 'value', 'desc' ]}></Select>
export default Select;