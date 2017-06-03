/**
 * 文本输入
 * @author gxiaobang
 * @example
 *   <Input name="user" defaultValue="admin" />
 */

import React from 'react';
import classnames from 'classnames';
import Validate from 'components/Validate';
import './style';

const { Validator } = Validate;

/*const messages = Validator.getMessages('zh');
console.log(messages)*/

class Input extends React.Component {

  /*state = {
    value: this.props.value
  };*/

  componentDidMount() {

  }

  // props更新
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      // 校验规则
      this.refs.validate && this.refs.validate.verify(nextProps.value);
    }
  }

  // 获取表单元素
  getElement() {
    return this.refs.input;
  }

  // 输入变化
  handleChange(e) {
    const { onChange } = this.props;
    let value = e.target.value;
    // 校验规则
    this.refs.validate && this.refs.validate.verify(value);

    onChange && onChange(e);
  }

  // 渲染元素
  renderElement(props, cls) {
    return <input {...props} ref="input" className={cls} onChange={this.handleChange.bind(this)} />;
  }

  render() {
    const { rules, className, ...props } = this.props;
    let cls = classnames('input', className);

    if (rules) {
      return (
        <Validate ref="validate" rules={rules} name={this.props.name}>
          {this.renderElement(props, cls)}
        </Validate>
      );
    }
    else {
      return this.renderElement(props, cls);
    }
  }
}

export default Input;