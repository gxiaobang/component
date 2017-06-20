/**
 * 弹窗测试
 */

import React from 'react';
import { Dialog, Button, Icon } from '@/components';

class Page extends React.Component {

  handleAlert() {
    Dialog.alert('测试弹窗', 'warn');
  }

  handleConfirm() {
    Dialog.confirm('测试弹窗', 'info');
  }

  handleOpen() {
    Dialog.open({
      url: '/dialog/info',
      'title': '修改'
    });
  }

  render() {
    return (
        <div className="page">
          <h3>{this.props.data.title}组件</h3>
          <p>
            <Button onClick={this.handleAlert} type="default">alert</Button>
          </p>
          <p>
            <Button onClick={this.handleConfirm} type="default">confirm</Button>
          </p>
          <p>
            <Button onClick={this.handleOpen} type="default">open</Button>
          </p>
        </div>
      )
  }
}

export default Page;