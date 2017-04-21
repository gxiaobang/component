/**
 * 链接
 */

import React from 'react';
import classnames from 'classnames';
import './style';

class Link extends React.Component {
  render() {
    const { href = 'javascript:;', type, children, className, onClick } = this.props;
    const cls = classnames('rc-smart-link', type && `rc-smart-link-${type}` ,className);
    return (
      <a href={href} className={cls} onClick={onClick}>{children}</a>
    );
  }
}

export default Link;