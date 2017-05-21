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
    const { className, rules, ...props } = this.props;
    let cls = classnames('input', className);
    
    if (rules) {
        return (
          <Validate rules={rules} value={this.state.value}>
            <input {...props} className={cls} onChange={this.handleChange.bind(this)} />
          </Validate>
        );
    }
    else {
      return (
        <input {...props} className={cls} />
      );
    }
  }
}

export default Input;