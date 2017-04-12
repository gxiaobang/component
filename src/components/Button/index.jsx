/**
 * 按钮
 * @example
 *   <Button type="primary" submit>primary</Button>
 */
import React from 'react';
import classnames from 'classnames';
import './style';

class Button extends React.Component {

  handleClick(...args) {
    this.props.onClick && this.props.onClick(...args);
  }

  render() {
    const { type = 'default' } = this.props;
    const cls = classnames('rc-smart-btn', `rc-smart-btn-${type}`);
    const btnType = this.props.hasOwnProperty('submit') ? 'submit' : 'button';

    return (
      <button type={btnType} className={cls} onClick={this.handleClick.bind(this)}>{this.props.children}</button>
    );
  }
}

export default Button;