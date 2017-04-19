/**
 * 按钮
 */

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Pagination } from 'components';
import './style';

// <colgroup><col style="width: 360px;"></colgroup>

class Table extends React.Component {

  renderColumns() {
    const { columns = [] } = this.props;
    return (
      <tr>
      {
        columns.map((item, index) => {
          return <th key={index}>{item.title}</th>
        })
      }
      </tr>
    );
  }

  renderData() {
    const { columns = [], data = [] } = this.props;

    return (
      data.map((item, index) => {
        return (
          <tr key={index}>
          {
            columns.map((item2, index2) => {
              let { key, title } = item2;
              let text = item[ key ];
              if (_.isFunction(item2.render)) {
                text = item2.render(text, item2);
              }
              return <td key={key}>{text}</td>
            })
          }
          </tr>
        )
      })
    )
  }

  render() {
    return (
      <div className="rc-smart-table-wrap">
        <table className="rc-smart-table">
          <thead>
            {this.renderColumns()}
          </thead>
          <tbody>
            {this.renderData()}
          </tbody>
        </table>
        <Pagination data={this.props.pagination || {}} />
      </div>
    )
  }
}

export default Table;