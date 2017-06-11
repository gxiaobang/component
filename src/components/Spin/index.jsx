/**
 * 加载中
 * @example
 *   <Spin></Spin>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from 'components';
import './style';

class Spin extends React.Component {
  render() {
    return (
      <div className="spin-wrapper">
        <span className="spin-anim">
          {/*<Icon type="spinner" size={16} />*/}
          <span className="spin-circle"></span>
          <span className="spin-circle"></span>
          <span className="spin-circle"></span>
          <span className="spin-circle"></span>
          <span className="spin-circle"></span>
        </span>
        <span>{this.props.children || '加载中...'}</span>
      </div>
    );
  }
}

export default Spin;