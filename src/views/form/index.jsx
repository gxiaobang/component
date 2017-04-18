/**
 * 表单
 */

import React from 'react';
import { Button, Input, Form, Checkbox, Radio, Select } from 'components';

const { FormItem } = Form;
const { Option } = Select;

console.log(Option)

class Page extends React.Component {

  handleClick() {
    console.log('我被点击了');
  }

  render() {
    return (
        <div className="page">
          <h3>{this.props.data.title}组件</h3>
          <Form>
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>

            <FormItem>
              <Select>
                <Option>请选择</Option>
              </Select>
            </FormItem>

            <FormItem>
              <Checkbox name="checkbox">多选框</Checkbox>
            </FormItem>

            <FormItem>
              <Radio name="radio">单选框</Radio>
            </FormItem>

            <FormItem>
              <Button>确定</Button>
            </FormItem>
          </Form>
        </div>
      )
  }
}

export default Page;