/**
 * 日期组件
 * @example
 *   <DatePicker format="YYYY-MM-DD" showTime />
 */

import React from 'react';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import Picker from 'rc-calendar/lib/Picker';
import moment from 'moment';
import { Input, Calendar } from 'components';

const timePickerElement = <TimePickerPanel />;
const now = moment();

class DatePicer extends React.Component {
  render() {
    /*return (
      <Calendar {...this.props} locale={zhCN} timePicker={timePickerElement} />
    );*/

    const { disabledDate, disabled, defaultValue, onChange, format } = this.props;

    const calendar = <Calendar 
      timePicker={timePickerElement} 
      defaultValue={now}
      format={format}
      timePicker={this.props.showTime ? timePickerElement : null}
      disabledDate={disabledDate}
    />;

    return (
      <Picker 
        // animation="slide-up"
        disabled={disabled}
        defaultValue={defaultValue}
        calendar={calendar}
        >
        {
          ({ value }) => {
            return <Input type="text" value={value && value.format(format) || ''} />
          }
        }
      </Picker>
    );
  }
}

export default DatePicer;