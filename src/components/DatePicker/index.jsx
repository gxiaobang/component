/**
 * 日期组件
 * @example
 *   <Calendar format="YYYY-MM-DD" />
 */

import React from 'react';
import Calendar from 'rc-calendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import 'rc-calendar/dist/rc-calendar.min.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

const timePickerElement = <TimePickerPanel />;

class DatePicer extends React.Component {
  render() {
    return (
      <Calendar {...this.props} locale={zhCN} timePicker={timePickerElement} />
    );
  }
}

export default DatePicer;