/**
 * 按钮
 * @example
 *   <Button type="primary" submit>primary</Button>
 */
import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import './style';

class Button extends React.Component {

  handleClick(...args) {
    this.props.onClick && this.props.onClick(...args);
  }

  render() {
    const { type = 'default', className } = this.props;
    const cls = classnames('btn', `btn-${type}`, className);
    const btnType = this.props.submit ? 'submit' : 'button';
    let txt = this.props.children;
    
    if (_.isString(txt)) {
      if (txt.length == 2) {
        txt = txt[0] + ' ' + txt[1];
      }
    }

    return (
      <button type={btnType} className={cls} onClick={this.handleClick.bind(this)}>{txt}</button>
    );
  }
}

export default Button;