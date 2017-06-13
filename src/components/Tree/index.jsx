/**
 * 树形控件
 */

import React from 'react';
import _ from 'lodash';
import { cls } from 'utils';
import classnames from 'classnames';
import './style';

class TreeNode extends React.Component {

  // showFlag = true;

  static contextTypes = {
    onSelect: React.PropTypes.func
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
    onSelect: React.PropTypes.func
  }

  getChildContext() {
    return { onSelect: this.props.onSelect }
  }

  render() {
    return <div className="tree">{this.props.children}</div>
  }
}


/*import testComponent from 'utils/testComponent';
testComponent(
  <Tree onSelect={
    (value) => console.log(value)
  }>
    <TreeNode label="0-0" value="0-0">
      <TreeNode label="1-1" value="1-1">
        <TreeNode label="2-1" value="2-1"></TreeNode>
        <TreeNode label="2-2" value="2-2"></TreeNode>
      </TreeNode>
      <TreeNode label="1-2" value="1-2"></TreeNode>
    </TreeNode>
  </Tree>
);*/


export default Tree;