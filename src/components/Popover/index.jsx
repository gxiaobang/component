/**
 * 工具提示
 * @example
 *   <Popover>
 *     提示内容
 *   </Popover>
 *   
 *   Popover.show({ point: [ 300, 200], message: '123' });
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './style';

let wrap;
const addPopover = (options) => {
  if (!wrap) {
    wrap = wrapper(<Container type="popover" />);
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

  ReactDOM.render(<Popover point={point} dir={dir}>{message}</Popover>, elem);
}

class Popover extends React.Component {
  static show = show;

  render() {
    const { children, title, point = [], dir = 'top' } = this.props;
    return (
      <div className={`popover popover-placement-${dir}`} style={
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
    <Popover point={[ 120, 120 ]} dir="top">1234567</Popover>
    <Popover point={[ 120, 200 ]} dir="bottom">1234567</Popover>
    <Popover point={[ 120, 280 ]} dir="left">1234567</Popover>
    <Popover point={[ 120, 360 ]} dir="right">1234567</Popover>
  </div>
);*/

// Popover.show({ point: [ 300, 200], message: '123' });

// Popover.show

export default Popover;