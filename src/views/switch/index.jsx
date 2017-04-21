/**
 * 按钮
 */

import React from 'react';
import { Button, Switch } from 'components';

class Page extends React.Component {

  handleChange(e) {
    console.log(e);
  }

  render() {
    return (
        <div className="page">
          <h3>{this.props.data.title}组件</h3>
          <Switch checkedChildren="ON" unCheckedChildren="OFF" name="flag" value="true" onChange={this.handleChange.bind(this)}></Switch>
        </div>
      )
  }
}

export default Page;