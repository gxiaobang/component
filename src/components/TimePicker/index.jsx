/**
 * 时间选择器
 */

import React from 'react';
import RcTimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

class TimePicker extends React.Component {
  render() {
    return (
      <RcTimePicker {...this.props} />
    );
  }
}

export default TimePicker;