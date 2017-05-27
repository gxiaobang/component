/**
 * 日期组件
 * @example
 *   <DatePicker format="YYYY-MM-DD" showTime />
 */

import React from 'react';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import Picker from 'rc-calendar/lib/Picker';
import moment from 'moment';
import { Input } from 'components';

import Calendar from 'rc-calendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import 'rc-calendar/assets/index.css';
import './style.scss';

const timePickerElement = <TimePickerPanel />;
const now = moment();

class DatePicer extends React.Component {
  render() {
    /*return (
      <Calendar {...this.props} locale={zhCN} timePicker={timePickerElement} />
    );*/

    const { disabledDate, readOnly, disabled, defaultValue, onChange, format, name } = this.props;
    const date = defaultValue && moment(defaultValue);

    const calendar = <Calendar 
      locale={zhCN}
      timePicker={timePickerElement} 
      defaultValue={date || now}
      format={format}
      timePicker={this.props.showTime ? timePickerElement : null}
      disabledDate={disabledDate}
    />;

    return (
      <Picker 
        // animation="slide-up"
        // value={value}
        calendar={calendar}
        defaultValue={date}
        >
        {
          ({ value }) => {
            return <Input disabled={readOnly || disabled} value={value && value.format(format) || ''} name={name} rules="required|date" />;
          }
        }
      </Picker>
    );
  }
}

export default DatePicer;