/**
 * 关闭
 */

import React from 'react';
import './style';

class Close extends React.Component {

  handleClick = this.props.onClick;

  render() {
    return (
      <span className="close" onClick={this.handleClick}>&times;</span>
    );
  }
}

export default Close;