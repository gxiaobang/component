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

  state = {
    value: this.props.value
  };

  // 输入变化
  handleChange(e) {
    let value = e.target.value;
    // 校验规则
    this.setState({
      value
    });
  }
  render() {
    const { rules, type, name, className, placeholder } = this.props;
    let cls = classnames('rc-smart-input', className, this.state.error && 'rc-smart-input-error');

    const props = { type, placeholder, name };
    if (this.props.hasOwnProperty('value')) {
      props.value = this.props.value;
    }
    if (this.props.hasOwnProperty('defaultValue')) {
      props.defaultValue = this.props.defaultValue;
    }
    
    if (rules) {
        return (
          <Validate rules={rules} value={this.state.value}>
            <input className={cls} {...props} onChange={this.handleChange.bind(this)} data-rules={rules} />
          </Validate>
        );
    }
    else {
      return (
        <input className={cls} {...props} />
      );
    }
  }
}

export default Input;