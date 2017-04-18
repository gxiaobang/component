/**
 * 图标
 */

import React from 'react';
import classnames from 'classnames';
import './style';

class Icon extends React.Component {
  render() {
    const { type, className } = this.props;
    return <i className={classnames('rc-smart-icon', `rc-smart-icon-${type}`, className)}></i>
  }
}

export default Icon;