/**
 * TreeSelect 树选择
 * @example
 *   <TreeSelect dataSource={dataSource}></TreeSelect>
 */

import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Input, Tree } from '@/components';
import { http } from '@/utils';
import './style';

class TreeSelect extends React.Component {

  state = {
    value: '',
    dataSource: this.props.dataSource || []
  };

  // 选择
  handleSelect(value, label) {
    // console.log(item);
    this.setState({
      label: label,
      value: value,
      isOpen: false
    });
  }

  // 切换打开列表
  toggleOpen(flag) {
    this.setState({
      isOpen: flag
    });
  }

  render() {
    let { name } = this.props;
    let { dataSource = [] } = this.state;

    return (
      <div className="tree-select">
        <div className="tree-select-input">
          <Input value={this.state.label} onFocus={
            () => {
              this.toggleOpen(true);
            }
          } onBlur={
            () => {
              // this.toggleOpen(false);
            }
          } 
            onInput={
              (e) => this.setState({ label: e.target.value })
            }
          />
          <input type="hidden" name={name} value={this.state.value} />
        </div>
        <div className={classnames('tree-select-list', this.state.isOpen ? 'open' : '')}>
          <Tree dataSource={dataSource} onSelect={this.handleSelect.bind(this)}></Tree>
        </div>
      </div>
    );
  }
}

/*import testComponent from 'utils/testComponent';
testComponent(
  <TreeSelect dataSource={[
      { label: '0-0', value: '0-0', children: [
        { label: '0-0-0', value: '0-0-0' },
        { label: '0-0-1', value: '0-0-1' }
      ] },
      { label: '0-1', value: '0-1' }
    ]} onSelect={
    (value) => console.log(value)
  }></TreeSelect>
);*/

export default TreeSelect;