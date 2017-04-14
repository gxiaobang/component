/**
 * 信息提示
 * by gxiaobang
 */

import React from 'react';
import ReactDOM from 'react-dom';
import wrapper from 'utils/wrapper';
import './style';

let wrap;
const addMessage = (options) => {
  if (!wrap) {
    wrap = wrapper(<Container />);
  }

  const { data } = wrap.state;
  data.unshift(options);
  wrap.setState({ data });
}

class Container extends React.Component {

  state = {
    data: []
  };

  removeItem(item) {
    const { data } = this.state;
    let index = data.indexOf(item);
    if (index > -1) {
      data.splice(index, 1);
      this.setState({ data });
    }
  }

  render() {
    return (
      <div className="rc-smart-message-container">
        {
          this.state.data.map((item, index) => {
            if (!item.rendered) {
              item.rendered = true;
              item.timer = setTimeout(() => {
                this.removeItem(item);
              }, item.duration);
            }
            return <Message key={index} type={item.type}>{item.content}</Message>
          })
        }
      </div>
    );
  }
}

class Message extends React.Component {

  static warn(content, duration = 3000, onClose) {    
    addMessage({ content, duration, onClose, type: 'warn' });
  }

  static success(content, duration = 3000, onClose) {
    addMessage({ content, duration, onClose, type: 'success' });
  }

  static info(content, duration = 3000, onClose) {
    addMessage({ content, duration, onClose, type: 'info' });
  }

  static error(content, duration = 3000, onClose) {
    addMessage({ content, duration, onClose, type: 'error' });
  }

  static loading(content, duration = 3000, onClose) {
    addMessage({ content, duration, onClose, type: 'loading' });
  }

  render() {
    return (
      <div className="rc-smart-message">
        <div className="rc-smart-message-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Message;