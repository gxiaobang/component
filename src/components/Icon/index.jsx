/**
 * 图标
 */

import React from 'react';
import classnames from 'classnames';
import './style';

class Icon extends React.Component {
  render() {
    const { type } = this.props;
    return <i className={classnames('rc-smart-icon', `rc-smart-icon-${type}`)}></i>
  }
}

export default Icon;