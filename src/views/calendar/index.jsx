/**
 * 日历
 */

import React from 'react';
import { Button, DatePicker, TimePicker, Form } from '@/components';
// import Calendar from 'rc-calendar';
const { FormItem } = Form;

class Page extends React.Component {

  render() {
    return (
      <div className="page">
        <h3>{this.props.data.title}组件</h3>
        <Form layout="inline">
          <FormItem label="日期">
            <DatePicker /*showTime*/ format="YYYY MM-DD" />
          </FormItem>

          <FormItem label="时间">
            <TimePicker />
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Page;