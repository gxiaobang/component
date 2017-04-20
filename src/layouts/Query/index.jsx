/**
 * 查询列表
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Table } from 'components';
import { getFormParam } from 'utils';
import _ from 'lodash';
import './style';

const { FormItem } = Form;

// 查询表单
class QueryForm extends React.Component {

  handleSubmit = this.props.onSubmit;

  componentDidMount() {
    // this.props.onSubmit && this.props.onSubmit
    const form = ReactDOM.findDOMNode(this.refs.form);
    const param = getFormParam(form);
    this.handleSubmit(param);
  }


  render() {
    return (
      <div className="query-form">
        <Form ref="form" layout="inline" onSubmit={this.handleSubmit}>
          {this.props.children}
          <FormItem>
            <Button type="primary" submit>查询</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

// 功能按钮
class QueryBtns extends React.Component {
  render() {
    return (
      <div className="query-btns">{this.props.children}</div>
    );
  }
}

// 查询列表
class QueryList extends React.Component {
  render() {
    const { columns, data, pagination, onChange, loading } = this.props;
    return (
      <div className="query-list">
        {this.props.children}
        <Table columns={columns} data={data} pagination={pagination} onChange={onChange} loading={loading}></Table>
      </div>
    );
  }
}

class Query extends React.Component {
  static QueryForm = QueryForm;
  static QueryList = QueryList;
  static QueryBtns = QueryBtns;

  render() {
    const { children } = this.props;

    let queryForm, queryList, queryBtns;
    
    let temp;
    if (!_.isArray(children)) {
      temp = [ children ];
    }
    else {
      temp = children;
    }

    // 划分区域内容
    temp.forEach(item => {
      switch (item.type.name) {
        case 'QueryForm':
          queryForm = item;
          break;
        case 'QueryList':
          queryList = item;
          break;
        case 'QueryBtns':
          queryBtns = item;
          break;
      }
    });

    // console.log(queryList.props.onChange)

    return (
      <div className="query">
        {queryForm}
        {queryBtns}
        {queryList}
      </div>
    );
  }
}

export default Query;