/**
 * 酒店管理
 */

import React from 'react';
import { Form, Input, Select, Button, Link, Dialog } from 'components';
import http from 'utils/http';
import Query from 'layouts/Query';

import cache from 'stores/cache';


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
      render: (text, item) => {
        return (
          <div>
            <Link onClick={
              () => {
                this.handleEdit(item);
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

  // 新增
  handleAdd() {
    cache.homeStore.open({
      title: '新增酒店',
      url: '/basedata/hotel/info'
    });
  }

  // 修改
  handleEdit(item) {
    cache.homeStore.open({
      title: `${item.code} - 编辑酒店`,
      url: '/basedata/hotel/info?code=' + item.code
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
          <FormItem label="品牌">
            <Select>
              <Option>请选择</Option>
            </Select>
          </FormItem>
          
          <FormItem label="编码">
            <Input name="code" />
          </FormItem>

          <FormItem label="酒店名称">
            <Input name="name" />
          </FormItem>


          <FormItem label="酒店状态">
            <Select name="option">
              <Option value="">请选择</Option>
            </Select>
          </FormItem>
        </QueryForm>

        {/* 功能按钮 */}
        <QueryBtns>
          <Button type="primary" onClick={
            () => {
              this.handleAdd();
            }
          }>新增</Button>
        </QueryBtns>

        {/* 查询列表 */}
        <QueryList columns={this.columns} http={this.http} refreshIndex={this.state.refreshIndex}>
        </QueryList>
      </Query>
    );
  }
}

export default Page;