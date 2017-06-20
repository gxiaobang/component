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
import { evt, getPoint } from '@/utils';
import wrapper from '@/utils/wrapper';
import turnoff from '@/utils/turnoff';
import './style';

let wrap;
class Container extends React.Component {

  static add(item) {
    if (!wrap) {
      wrap = wrapper(<Container type="tooltip" />);
    }
    let { data } = wrap.state;
    if (data.indexOf(item) == -1) {
      data.push(item);
      wrap.setState({ data });
    }
  }

  static remove(item) {
    let { data } = wrap.state;
    let index = data.indexOf(item);
    if (index > -1) {
      data.splice(index, 1);
      wrap.setState({ data })
    }
  }


  state = {
    data: []
  };

  render() {
    let { data } = this.state;
    return (
      <div className="tooltip-wrapper">
        {
          data.map((item, index) => {
            let { content, placement, point = [] } = item;
            return (
              <div key={index} className={`tooltip tooltip-placement-${placement}`} style={
                { left: point[0], top: point[1] }
              }>
                {content}
              </div>
            );
          })
        }
      </div>
    );
  }
}

class Tooltip extends React.Component {

  opt = {
    placement: this.props.placement || 'top'
  };

  componentDidMount() {
    this.init();
  }

  init() {
    let { trigger = ['click'] } = this.props;
    let elem = ReactDOM.findDOMNode(this);
    
    if (trigger.indexOf('click') > -1) {
      // let { dir } = this.props;
      evt.add(elem, 'click', () => {
        // console.log('我被点击了');
        this.show(elem);
        turnoff(elem, () => {
          console.log('destroy');
          this.destroy();
        });
      });
    }

    if (trigger.indexOf('hover') > -1) {
      evt.add(elem, 'mouseenter', () => {
        this.show(elem);
      })
      evt.add(elem, 'mouseleave', () => {
        this.destroy();
      })
    }
  }

  show(elem) {
    let point = getPoint(elem);
    switch (this.opt.placement) {
      case 'right':
        this.opt.point = [
          point.x  + elem.offsetWidth + 10,
          point.y + elem.offsetHeight / 2
        ];
        break;
      case 'left':
        this.opt.point = [
          point.x - 10,
          point.y + elem.offsetHeight / 2
        ];
        break;
      case 'top':
        this.opt.point = [
          point.x + elem.offsetWidth / 2,
          point.y - 10
        ];
        break;
      case 'bottom':
        this.opt.point = [
          point.x + elem.offsetWidth / 2,
          point.y + elem.offsetHeight + 10
        ];
        break;
    }
    
    this.opt.content = this.props.content;
    Container.add(this.opt);
  }

  // 销毁
  destroy() {
    Container.remove(this.opt);
  }

  render() {
    // const { children, title, point = [], dir = 'top' } = this.props;
    return this.props.children;
  }
}

/*import testComponent from '@/utils/testComponent';
import { Button } from '@/components';
testComponent(
  <div>
    <Tooltip placement="left" content="fdasfdasfsafd" trigger={['hover', 'click']}>
      <Button>图标</Button>
    </Tooltip>
    <Tooltip placement="top" content="fdasfdasfsafd">
      <Button>图标</Button>
    </Tooltip>
    <Tooltip placement="right" content="fdasfdasfsafd">
      <Button>图标</Button>
    </Tooltip>
    <Tooltip placement="bottom" content="fdasfdasfsafd">
      <Button>图标</Button>
    </Tooltip>
  </div>
);*/


export default Tooltip;