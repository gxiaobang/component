/**
 * 单选框
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
      <label className="rc-smart-radio">
        <input type="radio" name={name} defaultChecked={checked} onChange={this.handleChnage.bind(this)} />
        {this.props.children}
      </label>
    );
  }
}

export default Checkbox;