/**
 * 日历
 */

import React from 'react';
import { Button, Calendar } from 'components';
// import Calendar from 'rc-calendar';

class Page extends React.Component {

  render() {
    return (
        <div className="page">
          <h3>{this.props.data.title}组件</h3>
          <div>
            <Calendar format="YYYY-MM-DD HH:mm" />
          </div>
        </div>
      )
  }
}

export default Page;