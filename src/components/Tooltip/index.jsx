/**
 * 工具提示
 * @example
 *   <Tooltip>
 *     提示内容
 *   </Tooltip>
 *   
 *   Tooltip.show({ point: [ 300, 200], message: '123' });
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './style';

let wrap;
const addTooltip = (options) => {
  if (!wrap) {
    wrap = wrapper(<Container type="tooltip" />);
  }

  const { data } = wrap.state;

  // 清空数据
  data.length = 0;

  data.unshift(options);
  wrap.setState({ data });
}

let elem;
const show = ({ message, point, dir }) => {
  if (!elem) {
    elem = document.createElement('div');
    document.body.appendChild(elem);
  }

  ReactDOM.render(<Tooltip point={point} dir={dir}>{message}</Tooltip>, elem);
}

class Tooltip extends React.Component {
  static show = show;

  render() {
    const { children, title, point = [], dir = 'top' } = this.props;
    return (
      <div className={`tooltip tooltip-placement-${dir}`} style={
        { left: point[0], top: point[1] }
      }>
        {children}
      </div>
    );
  }
}

/*import testComponent from 'utils/testComponent';
testComponent(
  <div>
    <Tooltip point={[ 120, 120 ]} dir="top">1234567</Tooltip>
    <Tooltip point={[ 120, 200 ]} dir="bottom">1234567</Tooltip>
    <Tooltip point={[ 120, 280 ]} dir="left">1234567</Tooltip>
    <Tooltip point={[ 120, 360 ]} dir="right">1234567</Tooltip>
  </div>
);*/

// Tooltip.show({ point: [ 300, 200], message: '123' });

// Tooltip.show

export default Tooltip;