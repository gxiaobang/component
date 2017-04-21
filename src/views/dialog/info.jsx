/**
 * 详情修改
 */

import React from 'react';
import { Form, Input } from 'components';

const { FormItem } = Form;

class Page extends React.Component {

  render() {
    return (
      <Form>
        <FormItem label="编码">
          <Input placeholder="请输入编码" />
        </FormItem>
      </Form>
    )
  }
}

export default Page;