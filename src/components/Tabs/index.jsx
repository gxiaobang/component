/**
 * 标签页
 */

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import './style';

class TabPane extends React.Component {
  render() {
    return (
      <div className={classnames('tabs-pane', this.props.active && 'active')}>{this.props.children}</div>
    )
  }
}

class Tabs extends React.Component {
  static TabPane = TabPane;

  state = {
    current: this.props.current || 0
  };

  // tab点击事件
  handleClick(index) {
    this.setState({ current: index });
  }

  render() {
    let { current } = this.state;

    return (
      <div className="tabs">
        <div className="tabs-header">
          {
            this.props.children.map((item, index) => {
              return <div key={index} className={classnames('tabs-tab', current == index && 'active')} onClick={this.handleClick.bind(this, index)}>{item.props.label}</div>
            })
          }
        </div>
        <div className="tabs-body">
          {
            this.props.children.map((tabPane, index) => {
              return <TabPane key={index} active={current == index}>{tabPane.props.children}</TabPane>
            })
          }
        </div>
      </div>
    );
  }
}

/*import testComponent from 'utils/testComponent';
testComponent(
  <Tabs>
    <TabPane label="Tab 1" key="1">Content of tab 1</TabPane>
    <TabPane label="Tab 2" key="2">Content of tab 2</TabPane>
    <TabPane label="Tab 3" key="3">Content of tab 3</TabPane>
  </Tabs>
);*/

export default Tabs;