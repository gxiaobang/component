/**
 * 信息提示
 * @author gxiaobang
 * @example
 *   Toast.success('成功');
 */

import React from 'react';
import ReactDOM from 'react-dom';
import wrapper from 'utils/wrapper';
import { Icon } from 'components';
import './style';

let wrap;
const addToast = (options) => {
  if (!wrap) {
    wrap = wrapper(<Container type="toast" />);
  }

  const { data } = wrap.state;

  // 清空数据
  data.length = 0;

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
      <div className="toast-container">
        {
          this.state.data.map((item, index) => {
            if (!item.rendered) {
              item.rendered = true;
              item.timer = setTimeout(() => {
                this.removeItem(item);
                item.onClose && item.onClose();
              }, item.duration);
            }
            return <Toast key={index} type={item.type}>{item.content}</Toast>
          })
        }
      </div>
    );
  }
}

class Toast extends React.Component {

  static warn(content, duration = 3000, onClose) {    
    addToast({ content, duration, onClose, type: 'warn' });
  }

  static success(content, duration = 3000, onClose) {
    addToast({ content, duration, onClose, type: 'success' });
  }

  static info(content, duration = 3000, onClose) {
    addToast({ content, duration, onClose, type: 'info' });
  }

  static error(content, duration = 3000, onClose) {
    addToast({ content, duration, onClose, type: 'error' });
  }

  static loading(content = __('loading'), duration = 3000, onClose) {
    addToast({ content, duration, onClose, type: 'loading' });
  }

  // 销毁
  static destroy() {
    wrap.empty();
  }

  render() {
    let { type } = this.props;

    return (
      <div className="toast">
        <div className="toast-content">
          <Icon type={type} color="#fff" />
          <div className="toast-text">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

// Toast.loading();

export default Toast;