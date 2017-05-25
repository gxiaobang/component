/**
 * Transfer 穿梭框
 * @example
 *   <Transfer http={http} keys={keys} />
 */

import React from 'react';
import http from 'utils/http';
import classnames from 'classnames';
import './style';

class Transfer extends React.Component {

  state = {
    options: this.props.options || [],
    targetKeys: this.props.defaultValue || []
  };

  keys = this.props.keys || ['value', 'label'];

  componentDidMount() {
    if (this.props.http) {
      this.request();
    }
  }

  // 数据请求
  request() {
    http({
      ...this.props.http,
      onSuccess: (data) => {
        this.setState({
          options: data.data
        });
      }
    });
  }

  getSelectedKeys(type) {
    const { options, targetKeys } = this.state;
    let ret = [];

    switch (type) {
      case 'source':
         options.forEach(item => {
          if (targetKeys.indexOf(item[ this.keys[0] ]) == -1 && item.selected) {
            ret.push(item[ this.keys[0] ]);
          }
        });
        break;
      case 'target':
        options.forEach(item => {
          if (targetKeys.indexOf(item[ this.keys[0] ]) > -1 && item.selected) {
            ret.push(item[ this.keys[0] ]);
          }
        });
        break;
    }

    return ret;
  }

  // 移动
  handleMove(dir) {
    const { targetKeys } = this.state;
    let keys;

    switch (dir) {
      case 'left':
        keys = this.getSelectedKeys('target');

        for (let i = 0; i < keys.length; i++) {
          let n = targetKeys.indexOf(keys[i]);
          if (n > -1) {
            targetKeys.splice(n, 1);
          }
        }

        this.setState({
          targetKeys: targetKeys
        });
        break;

      case 'right':
        keys = this.getSelectedKeys('source');

        targetKeys.push(...keys);

        this.setState({
          targetKeys: targetKeys
        });
        break;
    }
  }

  // 选择
  handleSelected(item) {
    item.selected = !item.selected;
    this.setState({
      options: this.state.options
    });
  }

  renderSourceList() {
    const { options, targetKeys } = this.state;

    return (
      <ul className="transfer-list">
        {
          options.map((item, index) => {
            if (targetKeys.indexOf(item[ this.keys[0] ]) == -1) {
              return (
                <li key={index} className={classnames(item.selected && 'selected')} onClick={
                  () => this.handleSelected(item)
                }>
                  <label>
                    {item[ this.keys[1] ]}
                  </label>
                </li>
              );
            }
          })
        }
      </ul>
    );
  }

  renderTargetList() {
    const { name } = this.props;
    const { options, targetKeys } = this.state;

    return (
      <ul className="transfer-list">
        {
          options.map((item, index) => {
            if (targetKeys.indexOf(item[ this.keys[0] ]) > -1) {
              return (
                <li key={index} className={classnames(item.selected && 'selected')} onClick={
                  () => this.handleSelected(item)
                }>
                  <label>
                    <input type="hidden" name={name} value={item[ this.keys[0] ]} />
                    {item[ this.keys[1] ]}
                  </label>
                </li>
              );
            }
          })
        }
      </ul>
    );
  }

  render() {
    const { data, targetKeys } = this.props;

    return (
      <div className="transfer">
        {/* 左侧列表 */}
        {this.renderSourceList()}

        {/* 操作 */}
        <ul className="transfer-operation">
          <li>
            <button type="button" onClick={() => this.handleMove('left')}>&lt;</button>
          </li>
          <li>
            <button type="button" onClick={() => this.handleMove('right')}>&gt;</button>
          </li>
        </ul>

        {/* 右侧列表 */}
        {this.renderTargetList()}
      </div>
    );
  }
}

export default Transfer;