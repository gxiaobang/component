/**
 * 开关
 * <Switch name="switch"></Switch>
 */

import React from 'react';
import './style';

class Switch extends React.Component {

  handleChange = this.props.onChange;

  render() {
    const { name, value, checkedChildren, unCheckedChildren, defaultChecked } = this.props;
    return (
      <label className="rc-smart-switch">
        <input type="checkbox" name={name} value={value} defaultChecked={defaultChecked} onChange={this.handleChange} />
        <div className="rc-smart-switch-inner">
          <div className="rc-smart-switch-unchecked">{unCheckedChildren}</div>
          <div className="rc-smart-switch-checked">{checkedChildren}</div>
        </div>
      </label>
    );
  }
}

export default Switch;