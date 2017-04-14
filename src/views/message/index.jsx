/**
 * 消息测试
 */

import React from 'react';
import { Message, Button } from 'components';

class Page extends React.Component {

  handleClick() {
    // Dialog.alert('测试弹窗', 'warn');
    Message.warn('消息测试' + new Date);
  }

  render() {
    return (
      <div className="page">
        <h3>{this.props.data.title}组件</h3>
        <div>
          <Button onClick={this.handleClick}>消息测试</Button>
        </div>
      </div>
    )
  }
}

export default Page;