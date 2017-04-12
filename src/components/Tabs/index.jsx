/**
 * 标签页
 * @author gxiaobang
 * @version 0.1.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './style';


function getCls(...cls) {
  const tmpArr = [];
  cls.forEach(item => {
    if (item) {
      tmpArr.push(item);
    }
  });

  return tmpArr.join(' ');
}

class Tabs extends React.Component {
  static get TabPane() {
    return TabPane;
  }

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
      <div className="tabs">
        <div className="tabs-header">
          {
            this.props.children.map((item, index) => {
              return <div key={index} className={getCls('tabs-tab', this.state.index == index ? 'active' : '')} onClick={this.handleClick.bind(this, index)}>{item.props.tab}</div>
            })
          }
        </div>
        <div className="tabs-body">
          {
            this.props.children.map((item, index) => {
              return <div key={index} className={getCls('tabs-pane', this.state.index == index ? 'active' : '')}>{item.props.children}</div>
            })
          }
        </div>
      </div>
    );
  }
}

class TabPane extends React.Component {
  render() {
    return this.props.children;
  }
}

export default Tabs;