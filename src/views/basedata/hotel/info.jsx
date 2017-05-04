/**
 * 详情
 */

import React from 'react';
import { Form, Input, Select, Button, Link, Dialog } from 'components';
import http from 'utils/http';
import Info from 'layouts/Info';

import cache from 'stores/cache';

const { FormItem } = Form;
const { Option } = Select;
const { InfoFooter } = Info;


class Page extends React.Component {


  // 列表请求配置
  http = {
    url: '/basedata/hotel/pageList',
    // mock: true,
    params: this.props.query
  };

  render() {
    return (
      <Info http={this.http}>
      {
        ({ param }) => (
          <Form onSubmit={
            (param) => {
              console.log(param)
              cache.homeStore.closeCurrent();
              // 保存
              /*http({
                method: 'POST',
                url: 'xxx',
                data: param,
                onSuccess: (data) => {
                  // console.log(data);

                  cache.homeStore.closeCurrent();
                }
              });*/
            }
          }>
            <FormItem label="名称">
              <Input defaultValue={param.name} name="name" />
            </FormItem>

            <FormItem label="英文名">
              <Input defaultValue={param.euser} name="enuser" />
            </FormItem>

            <FormItem label="编号">
              <Input defaultValue={param.code} name="code" />
            </FormItem>

            <FormItem label="标准评级">
              <Input defaultValue={param.code} name="code" />
            </FormItem>

            <FormItem label="所属品牌">
              <Select>
                <Option>请选择</Option>
              </Select>
            </FormItem>

            <FormItem label="开业日期">
              <Select>
                <Option>请选择</Option>
              </Select>
            </FormItem>

            <FormItem label="管理类型">
              <Select>
                <Option>请选择</Option>
              </Select>
            </FormItem>

            <FormItem label="前台电话">
              <Select>
                <Option>请选择</Option>
              </Select>
            </FormItem>

            <InfoFooter>
              <Button type="primary" submit>保存</Button>
            </InfoFooter>
          </Form>
        )
      }
      </Info>
    );
  }
}

export default Page;