/**
 * 下拉选择框
 * @example
 *   <Select name="opt">
 *     <Option>请选择</Option>
 *     <Option>选项一</Option>
 *   </Select>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Validate from 'components/Validate';
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
    options: this.props.options || []
  };

  // value = this.props.defaultValue || this.props.value;

  // 获取元素
  getElement() {
    return this.refs.select;
  }

  // 获取值
  getVal() {
    let select = this.getElement();
    return select.value;
  }

  // change 事件
  handleChange(e) {
    let value = e.target.value;
    // 校验规则
    this.refs.validate && this.refs.validate.verify(value);
    this.props.onChange && this.props.onChange(e);
  }

  componentDidMount() {
    if (this.props.http) {
      this.request(this.props.http);
    }
  }

  // props更新
  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      // this.verify(nextProps);
      this.setState({
        options: nextProps.options
      });
    }
  }

  request(options) {
    this.http = http({
      ...options,
      onSuccess: (data) => {
        this.setState({
          options: data.data
        });

        if (this.props.defaultValue) {
          this.refs.select.value = this.props.defaultValue;
        }
      }
    });
  }

  // 渲染元素
  renderElement(props, cls, keys) {
    return (
      <select ref="select" {...props} className={cls} onChange={this.handleChange.bind(this)} onMouseDown={
        (e) => {
          if (this.props.readOnly) {
            e.preventDefault();
          }
        }
      }>
        {this.props.children}
        {
          this.state.options.map((item, index) => {
            let value = item[ keys[0] ];
            let label = item[ keys[1] ];
            return <option key={index} value={value}>{label}</option>;
          })
        }
      </select>
    );
  }

  render() {
    const { className, keys = ['value', 'label'], http, rules, options, ...props } = this.props;
    // const { options } = this.state;

    let cls = classnames('select', className);

    if (rules) {
      return (
        <Validate ref="validate" rules={rules} name={this.props.name}>
          {this.renderElement(props, cls, keys)}
        </Validate>
      );
    }
    else {
      return this.renderElement(props, cls, keys);
    }
  }
}

export default Select;