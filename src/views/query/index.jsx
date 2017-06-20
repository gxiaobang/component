/**
 * 查询布局
 */

import React from 'react';
import { Form, Input, Select, Button, Link, Dialog } from '@/components';
import http from '@/utils/http';
import Query from '@/layouts/Query';


const { QueryForm, QueryList, QueryBtns } = Query;
const { FormItem } = Form;
const { Option } = Select;


class Page extends React.Component {

  // 状态
  state = {
    refreshIndex: 0
  };

  // 表头
  columns = [
    { title: '编码', key: 'code' },
    { title: '编号', key: 'id' },
    { title: '名称', key: 'name' },
    { title: '操作', key: 'action',
      render: () => {
        return (
          <div>
            <Link onClick={
              () => {
                Dialog.open('/query/info', '详情')
                  .on('ok', () => {
                    this.refresh();
                  })
              }
            }>修改</Link>
          </div>
        );
      }
    }
  ];

  // 列表请求配置
  http = {
    url: '/basedata/hotel/pageList',
    // mock: true,
    params: {}
  };

  // 刷新数据
  refresh(param) {
    this.http.params = { ...param };
    this.setState({
      refreshIndex: ++this.state.refreshIndex
    });
  }

  render() {
    return (
      <Query>
        {/* 查询表单 */}
        <QueryForm onSubmit={
          // (param) => this.handleSubmit(param, this.page)
          (param) => this.refresh(param)
        }>
          <FormItem label="编码">
            <Input name="code" />
          </FormItem>
          <FormItem label="选项">
            <Select name="option">
              <Option value="">请选择</Option>
              <Option value="1">选项一</Option>
              <Option value="2">选项二</Option>
            </Select>
          </FormItem>
        </QueryForm>

        {/* 功能按钮 */}
        <QueryBtns>
          <Button type="primary">新增</Button>
        </QueryBtns>

        {/* 查询列表 */}
        <QueryList columns={this.columns} http={this.http} refreshIndex={this.state.refreshIndex}>
        </QueryList>
      </Query>
    );
  }
}

export default Page;