/*
 * 弹框
 * @author gxiaobang
 * @version 0.1.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { addEvent, removeEvent, fixEvent } from 'utils/event';
import { Button } from 'components';
import wrapper from 'utils/wrapper';
// 引入样式
import './style';

let wrap;
const addDialog = (options) => {
  if (!wrap) {
    wrap = wrapper(<Mask />);
  }

  const { data } = wrap.state;
  data.push(options);
  wrap.setState({ data });
  return wrap;
}

// 遮罩
class Mask extends React.Component {

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
    if (this.state.data.length) {
      return (
        <div className="rc-smart-mask">
        {
          this.state.data.map((item, index) => {
            if (!item.sequel) {
              item.sequel = Math.random();
            }

            return (
              <Dialog key={item.sequel} type={item.type} title={item.title} buttons={item.buttons} onClose={this.removeItem.bind(this, item)}>
                {item.content}
              </Dialog>
            );
          })
        }
        </div>
      );
    }
    else {
      return null;
    }
  }
}

class Dialog extends React.Component {
  // 警告框
  static alert(content, type = 'warn') {
    const buttons = [{ text: '确定', type: 'primary' }];
    const title = '提示框';
    addDialog({ content, type, buttons, title });
  }

  // 询问框
  static confirm(content, type = 'inquiry') {
    const buttons = [{ text: '确定', type: 'primary' }, { text: '取消', type: '' }];
    const title = '提示框';
    addDialog({ content, type, buttons, title });
  }

  // DOM插入
  static insert(content, title = '提示框', buttons = [{ text: '确定', type: 'primary' }, { text: '取消', type: '' }]) {
    addDialog({ content, buttons, title });
  }

  // 打开一个页面
  static open(url, data, title, buttons) {
    System.import('views/' + url + '.jsx')
      .then(module => {
        const Page = module.default;
        Dialog.insert(<Page data={data} />, title);
      })
      .catch(err => {
        Dialog.alert('页面找不到啦！');
      });
  }

  componentDidMount() {
    this.events();
    this.rebuild();
  }

  // 拖动事件
  handleDragable(e) {

    const elem = this.refs.dialog;
    let dx = e.clientX - elem.offsetLeft;
    let dy = e.clientY - elem.offsetTop;

    function _move(e) {
      e = fixEvent(e);

      // console.log(e.clientX, e.clientY);
      let x = Math.max(e.clientX - dx, 0);
      let y = Math.max(e.clientY - dy, 0);
      elem.style.left = x + 'px';
      elem.style.top = y + 'px';
    }

    function _end() {
      removeEvent(document, 'mousemove', _move);
      removeEvent(document, 'mouseup', _end);
    }

    addEvent(document, 'mousemove', _move);
    addEvent(document, 'mouseup', _end);
  }

  render() {
    const { type, buttons, title } = this.props;
    const content = this.props.children;
    return (
      <div className="rc-smart-dialog" ref="dialog">
        <header onMouseDown={this.handleDragable.bind(this)}>
          {title}
          <span className="close" onClick={this.handleClose.bind(this)}>&times;</span>
        </header>
        <section ref="content">
          {
            type ? (
              <div>
                <i className={type}></i>
                <div className="rc-smart-dialog-message">
                  {content}
                </div>
              </div>
            ) : (
              <div>{content}</div>
            )
          }
        </section>
        <footer ref="footer">
          {
            buttons.map((item, index) => {
              return (
                <Button 
                  key={index}
                  type={item.type}
                  onClick={
                    () => {
                      this.handleClose();
                      item.handler && item.handler.bind(this);
                    }
                  }>
                  {item.text}
                </Button>
              )
            })
          }
        </footer>
      </div>
    )
  }

  // 关闭弹窗
  handleClose() {
    this.props.onClose && this.props.onClose();
  }

  events() {
    addEvent(window, 'resize', () => {
      this.reflow();
    });
  }

  // 回流
  reflow() {
    this.limit();
    this.rebuild();
  }

  // 限制
  limit() {
    this.refs.content.style.maxHeight = document.documentElement.clientHeight - 160 + 'px';
  }

  // 重置位置
  rebuild() {
    this.refs.dialog.style.left = (document.documentElement.clientWidth - this.refs.dialog.offsetWidth) / 2 + 'px';
    this.refs.dialog.style.top = Math.max(
      (document.documentElement.clientHeight - this.refs.dialog.offsetHeight) / 2 - 50, 20) + 'px';
  }
}

export default Dialog;


/*import Checkbox from 'components/checkbox';
import Select from 'components/select';
import Input from 'components/input';

Dialog.warn('hello world')
Dialog.info('hello world')
Dialog.success('hello world')
Dialog.error('hello world')
const param = {};
Dialog.open('views/abc/index', [
  // 保存
  () => {

  },
  // 取消
  () => {

  }
])*/


/*dialog.alert('警告框', 'warn');
dialog.confirm('询问框', 'inquiry');
// 弹窗页面
dialog.load(
    url, param, fn
  );
// dom插入
dialog.insert(
    <Page />, '标题'
  );

message.show('', 'warn');
message.show('', 'success');

// 表格组件
<Table data={data} />*/