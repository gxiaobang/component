/**
 * 多选框
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './style';

class Checkbox extends React.Component {
  
  handleChnage(...args) {
    const { onChange } = this.props;

    onChange && onChange(...args);
  }

  render() {
    const { name, checked, value } = this.props;
    return (
      <lable className="rc-smart-checkbox">
        <input type="checkbox" name={name} defaultChecked={checked} onChange={this.handleChnage.bind(this)} />
        {this.props.children}
      </lable>
    );
  }
}

export default Checkbox;