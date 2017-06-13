/*
 * 弹框
 * @author gxiaobang
 * @version 0.1.0
 * @example
 *   Dialog.alert('内容123', 'warn');
 *   Dialog.confirm('内容123？');
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { evt, effects, noop } from 'utils';
import { Button, Icon } from 'components';
import router from 'utils/router';
import wrapper from 'utils/wrapper';
import classnames from 'classnames';

// 引入样式
import './style';

let wrap;
const addDialog = (options) => {
  if (!wrap) {
    wrap = wrapper(<Container type="dialog" />);
  }

  const { data } = wrap.state;
  data.push(options);
  wrap.setState({ data });
  return wrap;
}

// 遮罩
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

  // 关闭当前页面弹窗
  closeCurrent() {
    /*if (data.length) {
      data.splice(data.length - 1, 1);
      this.setState();
    }*/

    /*effects.anim();
    effects(div).frame('fadeInDown', () => {

    });
*/
    const { data } = this.state;
    for (let i = data.length - 1; i > -1; i--) {
      if (data[i].isInsert) {
        // console.log(data[i])
        this.removeItem(data[i]);
        /*effects(data[i].com.refs.dialog)
          .frame('fadeOutUp')
          .then(() => {
            this.removeItem(data[i]);
          })*/
        break;
      }
    }
  }
  
  render() {
    if (this.state.data.length) {
      return (
        <div className="mask">
        {
          this.state.data.map((item, index) => {
            if (!item.sequel) {
              item.sequel = Math.random();
            }

            return (
              <Dialog disabled={index < this.state.data.length - 1} key={item.sequel} type={item.type} title={item.title} btns={item.btns} onClose={this.removeItem.bind(this, item)} isInsert={item.isInsert} animated={item.animated} ref={com => item.com = com}>
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

  static closeCurrent() {
    wrap && wrap.closeCurrent();
  }

  // 警告框
  static alert(content, type = 'warn', onOk = noop) {
    const btns = [{ text: '确定', type: 'primary', key: 'ok', handler: onOk }];
    const title = '提示框';
    addDialog({ content, type, btns, title });
  }

  // 询问框
  static confirm(content, type = 'inquiry', onOk = noop) {
    const btns = [{ text: '确定', type: 'primary', key: 'ok', handler: onOk }, { text: '取消', key: 'cancel' }];
    const title = '提示框';
    addDialog({ content, type, btns, title });
  }

  // DOM插入
  static insert({ content, title = '提示框', btns = [{ text: '确定', type: 'primary', key: 'ok' }, { text: '取消', key: 'cancel' }], animated }) {
    addDialog({ content, btns, title, isInsert: true, animated });
  }

  // 打开一个页面
  static open({ url, title, data = null, btns = [] }) {
    // console.log(router.getPageURL(url))
    const location = router.getLocation(url);
    import('views/' + router.getPageURL(url) + '.jsx')
      .then(module => {
        const Page = module.default;
        Dialog.insert({ content: <Page data={data} location={location} />, title, btns });
      })
      .catch(err => {
        console.log(err)
        throw err;
      });
  }

  componentDidMount() {
    this.events();
    this.reflow();
  }

  // 组件卸载
  componentWillUnmount() {
    // console.log(this.unbind);
    this.unbind();
  }

  // 拖动事件
  handleDragable(e) {

    const elem = this.refs.dialog;
    let dx = e.clientX - elem.offsetLeft;
    let dy = e.clientY - elem.offsetTop;

    function _move(e) {
      e = evt.fix(e);

      // console.log(e.clientX, e.clientY);
      let x = Math.max(e.clientX - dx, 0);
      let y = Math.max(e.clientY - dy, 0);
      elem.style.left = x + 'px';
      elem.style.top = y + 'px';
    }

    function _end() {
      evt.remove(document, 'mousemove', _move);
      evt.remove(document, 'mouseup', _end);
    }

    evt.add(document, 'mousemove', _move);
    evt.add(document, 'mouseup', _end);
  }

  render() {
    const { type, btns, title, disabled, isInsert, animated = true } = this.props;
    const content = this.props.children;

    if (isInsert) {
      return (
        <div className={classnames('dialog', animated && 'animated short fadeInDown', disabled && 'dialog-disabled')} ref="dialog">
          <header onMouseDown={this.handleDragable.bind(this)}>
            {title}
            <span className="close" onClick={this.handleClose.bind(this)}>&times;</span>
          </header>
          <section ref="content">
            <div className="dialog-content">{content}</div>
          </section>
          {
            btns.length > 0 && 
              <footer ref="footer">
                {
                  btns.map((item, index) => {
                    return (
                      <Button 
                        key={index}
                        type={item.type}
                        onClick={
                          () => {
                            this.handleClose();
                            item.handler && item.handler.call(this);
                          }
                        }>
                        {item.text}
                      </Button>
                    )
                  })
                }
              </footer>
          }
        </div>
      )
    }
    else {
      return (
        <div className={classnames('dialog dialog-message', 'animated short fadeInDown', disabled && 'dialog-disabled')} ref="dialog">
          <section ref="content">
            <Icon type={type} className={`dialog-icon-${type}`} />
            <div className="dialog-message-text">
              <div className="dialog-message-text-main">
                {content}
              </div>
            </div>
          </section>
          {
            btns.length > 0 && 
              <footer ref="footer">
                {
                  btns.map((item, index) => {
                    return (
                      <Button 
                        key={index}
                        type={item.type}
                        onClick={
                          () => {
                            this.handleClose();
                            item.handler && item.handler.call(this);
                          }
                        }>
                        {item.text}
                      </Button>
                    )
                  })
                }
              </footer>
          }
        </div>
      )
    }
  }

  // 关闭弹窗
  handleClose() {
    this.props.onClose && this.props.onClose();
  }

  events() {
    this.unbind = evt.add(window, 'resize', () => {
      this.reflow();
    });
  }

  // 回流
  reflow() {
    this.limit();
    // this.rebuild();
  }

  // 限制
  limit() {
    this.refs.content.style.maxHeight = document.documentElement.clientHeight - 160 + 'px';
  }

  // 重置位置
  rebuild() {
    this.refs.dialog.style.left = Math.max((document.documentElement.clientWidth - this.refs.dialog.offsetWidth) / 2, 0) + 'px';
    this.refs.dialog.style.top = Math.max(
      (document.documentElement.clientHeight - this.refs.dialog.offsetHeight) / 2 - 50, 20) + 'px';
  }
}

export default Dialog;