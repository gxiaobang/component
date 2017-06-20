/**
 * 动画
 * @example
 *   <Animate name="fadeOut">
 *     <div style={{
 *       width: 100,
 *       height: 100,
 *       background: 'blue'
 *     }}></div>
 *   </Animate>
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { effects } from '@/utils';
import './animate';

class Animate extends Component {

  componentDidMount() {
    this.init()
  }

  init() {
    let elem = ReactDOM.findDOMNode(this);
    effects(elem)
      .frame(this.props.name)
      /*.then(() => {
        console.log(this)
      })*/
  }

  render() {
    return this.props.children;
  }
}

/*import testComponent from '@/utils/testComponent';
testComponent(
  <Animate name="spin" duration="hinge">
    <div style={{
     width: 100,
     height: 100,
     background: 'blue'
    }}></div>
 </Animate>
);*/

export default Animate;