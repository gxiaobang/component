/**
 * 信息提示
 * @author gxiaobang
 * @example
 *   Message.success('成功');
 */

import React from 'react';
import ReactDOM from 'react-dom';
import wrapper from 'utils/wrapper';
import { Icon } from 'components';
import './style';

let wrap;
const addMessage = (options) => {
  if (!wrap) {
    wrap = wrapper(<Container type="message" />);
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

  // 清空数据
  empty() {
    const { data } = this.state;
    if (data.length) {
      data.length = 0;
      this.setState({ data });
    }
  }

  render() {
    return (
      <div className="message-container">
        {
          this.state.data.map((item, index) => {
            if (!item.rendered) {
              item.rendered = true;
              item.timer = setTimeout(() => {
                this.removeItem(item);
                item.onClose && item.onClose();
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

  // 销毁
  static destroy() {
    wrap.empty();
  }

  render() {
    let { type = 'success' } = this.props;
    return (
      <div className="message">
        <div className="message-content">
          <Icon type={type} color="#fff" />
          <div className="message-text">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Message;