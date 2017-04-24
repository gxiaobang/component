/**
 * 工具提示
 * @example
 *   <Tooltip>
 *     提示内容
 *   </Tooltip>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './style';

class Tooltip extends React.Component {
  render() {
    const { children, title } = this.props;
    return (
      di
      <div className="rc-smart-tooltips">
        {children}
      </div>
    );
  }
}

// Tooltip.show

export default Tooltip;