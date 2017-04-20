/**
 * 链接
 */

import React from 'react';
import classnames from 'classnames';
import './style';

class Link extends React.Component {
  render() {
    const { href = 'javascript:;', children, className, onClick } = this.props;
    const cls = classnames('rc-smart-link', className);
    return (
      <a href={href} className={cls} onClick={onClick}>{children}</a>
    );
  }
}

export default Link;