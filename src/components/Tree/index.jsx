/**
 * 树形控件
 */

import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import { cls, http } from '@/utils';
import PropTypes from 'prop-types';
import './style';

class TreeNode extends React.Component {

  // showFlag = true;

  static contextTypes = {
    onSelect: PropTypes.func
  };

  state = {
    showFlag: true
  }


  handleClick(isLeaf, label, value) {
    if (isLeaf) {
      this.onSelect(label, value);
    }
    else {
      this.onExpand();
    }
  }

  // 展开
  onExpand() {
    this.setState({
      showFlag: !this.state.showFlag
    });
  }

  // 选择
  onSelect(label, value) {
    // console.log(value);
    this.context.onSelect && this.context.onSelect(value, label);
  }

  render() {
    let { label, value, children } = this.props;

    return (
      <div className={classnames('tree-node', this.state.showFlag && 'show')}>
        <div className="tree-node-text" onClick={
          () => this.handleClick(!children, label, value)
        }>
          <span className={children ? "caret" : 'is-leaf'}></span>
          {label}
        </div>
        {
          children &&
            <div className="tree-node-list">
              {children}
            </div>
        }
      </div>
    );
  }
}

class Tree extends React.Component {
  static TreeNode = TreeNode;

  static childContextTypes = {
    onSelect: PropTypes.func
  }

  state = {
    dataSource: this.props.dataSource
  };

  getChildContext() {
    return { onSelect: this.props.onSelect }
  }

  componentDidMount() {
    this.request();
  }

  // 请求
  request() {
    if (this.props.http) {
      let { onSuccess } = this.props.http;
      http({
        ...this.props.http,
        onSuccess: (data) => {
          // console.log(data);
          this.setState({
            dataSource: data.data
          })
          onSuccess && onSuccess(data);
        }
      });
    }
  }

  // 渲染树节点
  renderTree(data) {
    let nodes = [];
    for (let i = 0; i < data.length; i++) {
      if (_.isArray(data[i].children)) {
        nodes.push(
          <TreeNode key={i} label={data[i].label} value={data[i].value}>{this.renderTree(data[i].children)}</TreeNode>
        );
      }
      else {
        nodes.push(
          <TreeNode key={i} label={data[i].label} value={data[i].value}></TreeNode>
        );
      }
    }

    return nodes;
  }

  render() {
    let { dataSource = [] } = this.state;
    return (
      <div className="tree">
        {
          dataSource.length > 0 ?
            this.renderTree(dataSource)
            : this.props.children
        }
      </div>
    );
  }
}


/*import testComponent from 'utils/testComponent';
testComponent(
  <Tree dataSource={[
      { label: '0-0', value: '0-0', children: [
        { label: '0-0-0', value: '0-0-0' },
        { label: '0-0-1', value: '0-0-1' }
      ] },
      { label: '0-1', value: '0-1' }
    ]} onSelect={
    (value) => console.log(value)
  }>
  </Tree>
);


testComponent(
  <Tree http={{
    url: '/tree',
    onSuccess: (data) => {
      console.log(data);
    }
  }} onSelect={
    (value) => console.log(value)
  }>
  </Tree>
);
*/

export default Tree;
