/**
 * 工具提示
 * @example
 *   <Tooltip>
 *     提示内容
 *   </Tooltip>
 *   
 *   Tooltip.out({ point: [ 300, 200], message: '123' });
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './style';

let elem;
const out = ({ message, point = [0, 0] }) => {
  if (!elem) {
    elem = document.createElement('div');
    document.body.appendChild(elem);
  }

  ReactDOM.render(<Tooltip point={point}>{message}</Tooltip>, elem);
}

class Tooltip extends React.Component {
  static out = out;

  render() {
    const { children, title, point } = this.props;
    return (
      <div className="tooltip" style={
        { left: point[0], top: point[1] }
      }>
        {children}
      </div>
    );
  }
}

// Tooltip.out({ point: [ 300, 200], message: '123' });

// Tooltip.show

export default Tooltip;