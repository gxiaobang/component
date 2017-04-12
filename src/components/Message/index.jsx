/**
 * 信息提示
 * by gxiaobang
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './style';


class Message extends React.Component {
  show(msg, icon) {

    this.hide();
    if (!this.element) {
      this.element = document.createElement('div');
      ReactDOM.render(
          <Message msg={msg} icon={icon} />,
          Message.element
        );
      document.body.appendChild(Message.element);
    }
    Message.element.style.display = '';
    Message.timer = setTimeout(() => {
      this.hide();
    }, 2000);
  }

  hide() {
    if (Message.element) {
      clearTimeout(Message.timer);
      Message.element.style.display = 'none';
    }
  }

  static warn() {

  }

  static success() {

  }

  static info() {

  }

  static error() {

  }

  static loading() {

  }

  render() {
    return (
        <div className="message">
          {this.props.msg}
        </div>
      )
  }
}

export default Message;