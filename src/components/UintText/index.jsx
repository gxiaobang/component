/**
 * 单位文本
 */

import React from 'react';
import './style';

class UintText extends React.Component {
  render() {
    return (
      <div className="uint-text">{this.props.children}</div>
    );
  }
}

export default UintText;