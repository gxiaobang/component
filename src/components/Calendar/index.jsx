/**
 * 日历组件
 * @example
 *   <Calendar format="YYYY-MM-DD" />
 */

import React from 'react';
import RcCalendar from 'rc-calendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import 'rc-calendar/dist/rc-calendar.min.css';

class Calendar extends React.Component {
  render() {
    console.log(this.props)
    return (
      <RcCalendar locale={zhCN} {...this.props} />
    );
  }
}

export default Calendar;