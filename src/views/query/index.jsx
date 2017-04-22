/**
 * 查询布局
 */

import React from 'react';
import { Form, Input, Select, Button, Link, Dialog } from 'components';
import http from 'utils/http';
import Query from 'layouts/Query';


const { QueryForm, QueryList, QueryBtns } = Query;
const { FormItem } = Form;
const { Option } = Select;


class Page extends React.Component {

  // 状态
  state = {
    data: []
  };

  page = {
    index: 1,
    size: 20
  };

  // 表格列
  columns = [
    { title: '影片', key: 'filmName' },
    { title: '影片长度', key: 'duration', render: (text) => `${text}分钟` },
    { title: '时间', key: 'date' },
    { title: '操作', key: 'action',
      render: () => {
        return (
          <div>
            <Link onClick={
              () => {
                Dialog.open('/query/index')
              }
            }>修改</Link>
          </div>
        );
      }
    }
  ];

  handleSubmit(param, param2) {
    // 保存查询参数
    this.param = param;
    // this.loading = true;
    this.setState({ loading: true });
    http({
      baseURL: '/mock',
      url: '/test',
      param: { ...param, ...param2 }
    }).then(response => {
      // console.log(response)
      this.setState({
        data: response.data.data,
        pagination: { ...response.data.page },
        loading: false
      });
    });
  }

  render() {
    return (
      <Query>
        {/* 查询表单 */}
        <QueryForm onSubmit={
          (param) => this.handleSubmit(param, this.page)
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
          <Button>导出</Button>
        </QueryBtns>

        {/* 查询列表 */}
        <QueryList columns={this.columns} data={this.state.data} pagination={this.state.pagination} loading={this.state.loading} onChange={
          (index, size) => {
            this.handleSubmit(this.param, { index, size });
          }
        }>
        </QueryList>
      </Query>
    );
  }
}

export default Page;