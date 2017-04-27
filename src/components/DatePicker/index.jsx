/**
 * 日期组件
 * @example
 *   <DatePicker format="YYYY-MM-DD" showTime />
 */

import React from 'react';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import RcDatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment';
import { Input, Calendar } from 'components';

const timePickerElement = <TimePickerPanel />;
const now = moment();

class DatePicer extends React.Component {
  render() {
    /*return (
      <Calendar {...this.props} locale={zhCN} timePicker={timePickerElement} />
    );*/

    const { disabledDate, disabled, value, onChange, format } = this.props;

    const calendar = <Calendar 
      timePicker={timePickerElement} 
      defaultValue={now}
      format={format}
      timePicker={this.props.hasOwnProperty('showTime') ? timePickerElement : null}
      disabledDate={disabledDate}
    />;

    return (
      <RcDatePicker 
        // animation="slide-up"
        disabled={disabled}
        // value={value}
        calendar={calendar}
        onChange={onChange}
        >
        {
          ({ value }) => {
            return <input type="text" className="rc-smart-input" value={value && value.format(format) || ''} />
          }
        }
      </RcDatePicker>
    );
  }
}

export default DatePicer;