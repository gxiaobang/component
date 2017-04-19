/**
 * 分页组件
 * @example
 // 总数count, 页码index, 每页显示数size
    <Pagination data={{ count: 100, index: 1, size: 100 }}></Pagination>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import './style';

class Pagination extends React.Component {

  state = {
    index: this.props.data.index,
    size: this.props.data.size,
    total: this.props.data.total
  };

  handleClick(command) {
    let { index, size } = this.state;

    switch (command) {
      case 'prev':
        index = Math.max(index - 1, 1);
        break;
      case 'next':
        index = Math.min(index + 1, this.count);
        break;
      default:
        index = command;
    }

    if (this.state.index != index) {
      this.setState({
        index
      });
      this.props.onChange && this.props.onChange(index, size);
    }
  }
  
  // 渲染条数
  renderRecord() {
    const { total = 0, index = 1, size = 10 } = this.state || {};
    this.count = Math.ceil(total / size);

    const n = 5;
    const p = (n - 1) / 2;
    // 补够位
    const fixnumStart = Math.max(0, p - (this.count - index));
    const fixnumEnd = Math.max(0, p + 1 - index);

    const node = [];
    node.push(<li key="prev" onClick={this.handleClick.bind(this, 'prev')}>&laquo;</li>);
    for (let i = 1; i <= this.count; i++) {
      if (i >= index - p - fixnumStart && i <= index + p + fixnumEnd) {
        node.push(<li className={classnames(i == index ? 'active' : null)} key={i} onClick={this.handleClick.bind(this, i)}>{i}</li>);
      }
    } 
    node.push(<li key="next" onClick={this.handleClick.bind(this, 'next')}>&raquo;</li>);
    return node;
  }
  
  render() {
    
    return (
      <div className="rc-smart-pagination">
        <div className="rc-smart-pagination-total">
          总纪录数 {this.state.total} 条
        </div>
        <ul className="rc-smart-pagination-main">
          {this.renderRecord()}
        </ul>
      </div>
    );
  }
}

export default Pagination;