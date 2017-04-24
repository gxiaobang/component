/**
 * 日历
 */

import React from 'react';
import { Button, DatePicker, TimePicker, Form } from 'components';
// import Calendar from 'rc-calendar';
const { FormItem } = Form;

class Page extends React.Component {

  render() {
    return (
      <div className="page">
        <h3>{this.props.data.title}组件</h3>
        <Form>
          <FormItem>
            <DatePicker format="YYYY-MM-DD HH:mm:ss" />
          </FormItem>

          <FormItem>
            <TimePicker />
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Page;