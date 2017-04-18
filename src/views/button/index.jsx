/**
 * 按钮
 */

import React from 'react';
import { Button } from 'components';

class Page extends React.Component {

  handleClick() {
    console.log('我被点击了');
  }

  render() {
    return (
        <div className="page">
          <h3>{this.props.data.title}组件</h3>
          <p>
            <Button type="default">Default</Button>
          </p>
          <p>
            <Button type="primary">Primary</Button>
          </p>
          <p>
            <Button type="success">Success</Button>
          </p>
          <p>
            <Button type="info">Info</Button>
          </p>
          <p>
            <Button type="warn">Warn</Button>
          </p>
          <p>
            <Button type="danger">Danger</Button>
          </p>
        </div>
      )
  }
}

export default Page;