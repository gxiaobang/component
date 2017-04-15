/**
 * 标签页
 * @author gxiaobang
 * @version 0.1.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import './style';

class TabPane extends React.Component {
  render() {
    return this.props.children;
  }
}

class Tabs extends React.Component {
  static TabPane = TabPane;

  constructor(props) {
    super(props);

    this.state = {
      index: this.props.index || 0
    };
  }

  // tab点击事件
  handleClick(index) {
    this.setState({
      index: index
    });
  }

  render() {
    return (
      <div className="rc-smart-tabs">
        <div className="rc-smart-tabs-header">
          {
            this.props.children.map((item, index) => {
              return <div key={index} className={classnames('rc-smart-tabs-tab', this.state.index == index ? 'active' : '')} onClick={this.handleClick.bind(this, index)}>{item.props.tab}</div>
            })
          }
        </div>
        <div className="rc-smart-tabs-body">
          {
            this.props.children.map((item, index) => {
              return <div key={index} className={classnames('rc-smart-tabs-pane', this.state.index == index ? 'active' : '')}>{item.props.children}</div>
            })
          }
        </div>
      </div>
    );
  }
}

export default Tabs;