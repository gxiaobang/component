/**
 * 开关
 * <Switch name="switch"></Switch>
 */

import React from 'react';
import './style';

class Switch extends React.Component {

  // handleChange = this.props.onChange;

  handleChange(e) {
    const { onChange, value = [] } = this.props;
    this.refs.input.value = e.target.checked ? value[1] : value[0];

    onChange && onChange(e);
  }

  render() {
    const { name, value = [], checkedChildren, unCheckedChildren, defaultChecked, disabled } = this.props;
    return (
      <label className="switch">
        <input type="checkbox" defaultChecked={defaultChecked} disabled={disabled} onChange={this.handleChange.bind(this)} />
        <div className="switch-inner">
          <div className="switch-unchecked">{unCheckedChildren}</div>
          <div className="switch-checked">{checkedChildren}</div>
        </div>

        <input type="hidden" name={name} defaultValue={defaultChecked ? value[1] : value[0]} ref="input" />
      </label>
    );
  }
}

export default Switch;