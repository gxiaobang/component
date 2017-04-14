/**
 * 弹框
 * @author gxiaobang
 * @version 0.1.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
// import depend from 'base/depend';
import { addEvent, removeEvent, fixEvent } from 'utils/event';
// 引入样式
import './style';

// 创建遮罩层
function createMask() {
  var mask = document.createElement('div');
  mask.className = 'mask';
  document.body.appendChild(mask);
  return mask;
}

class Dialog extends React.Component {
  // 警告框
  static alert(msg, icon = 'warn') {
    var mask = createMask();
    return ReactDOM.render(
        <Dialog type="alert" msg={msg} icon={icon} title="提示框" 
          btns={
            [{ text: '确定', cls: '' }]
          }
        />,
        mask
      );
  }

  // 询问框
  static confirm(msg, icon = 'inquiry') {
    var mask = createMask();
    return ReactDOM.render(
        <Dialog type="confirm" msg={msg} icon={icon} title="提示框" 
          btns={
            [{ text: '确定', cls: '' }, { text: '取消', cls: '' }]
          }
        />,
        mask
      );
  }
  // 页面加载
  static load(url, param = null, title = '') {
    var mask = createMask();
    return ReactDOM.render(
        <Dialog type="load" url={url} param={param} title={title} />,
        mask
      );
  }
  // DOM插入
  static insert(page, title) {
    var mask = createMask();
    return ReactDOM.render(
        <Dialog type="insert" page={page}  title={title} />,
        mask
      );
  }

  // 打开一个页面
  static open(url, data, title) {
    System.import('views/' + url + '.jsx')
      .then(module => {
        const Page = module.default;
        this.insert(<Page data={data} />, title);
      })
      .catch(err => {
        Dialog.alert('页面找不到啦！');
      });
  }

  componentWillMount() {
    switch (this.props.type) {
      case 'load':
        this.props.page = '加载中...';

        depend.require(this.props.url, (Page) => {
          this.props.page = <Page param={this.props.param} />;
          this.setState({
            page: this.props.page
          });
        });
        break;
    }
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
    return (
      <div className="dialog" ref="dialog">
        <header onMouseDown={this.handleDragable.bind(this)}>
          {this.props.title}
          <span className="close" onClick={this.handleClose.bind(this)}>&times;</span>
        </header>
        <section ref="content">
          {
            this.props.msg ? (
              <div>
                <i className={this.props.icon}></i>
                <div className="dialog-message">
                  {this.props.msg}
                </div>
              </div>
            ) : (
              <div>{this.props.page}</div>
            )
          }
        </section>
        <footer ref="footer">
          {
            this.props.btns.map((item, index) => {
              return (
                  <button 
                    key={index}
                    type="button"
                    className={item.cls} 
                    onClick={
                      () => {
                        this.handleClose();
                        item.handler && item.handler.bind(this);
                      }
                    }>
                    {item.text}
                  </button>
                )
            })
          }
        </footer>
      </div>
    )
  }

  // 关闭弹窗
  handleClose() {
    document.body.removeChild(
        this.refs.dialog.parentNode
      );
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