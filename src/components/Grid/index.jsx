/**
 * Grid 栅格
 */

import React from 'react';
import './style';

class Row extends React.Component {
  render() {
    return (
      <div className="rc-smart-row">{this.props.children}</div>
    );
  }
}

class Col extends React.Component {
  render() {
    return (
      <div className="rc-smart-col">{this.props.children}</div>
    );
  }
}

export { Row, Col };