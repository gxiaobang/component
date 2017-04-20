/**
 * 工具提示
 */

import React from 'react';
import ReactDOM from 'react-dom';

class Tooltips extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="rc-smart-tooltips">
        {children}
      </div>
    );
  }
}

// Tooltips.show

export default Tooltips;