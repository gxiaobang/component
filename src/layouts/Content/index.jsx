/**
 * 内容区域
 */
import React from 'react';
import { observer } from 'mobx-react';
import { Close } from 'components';
import router from 'utils/router';
import classnames from 'classnames';
import './style';

// tabs切换
@observer
class PageTabs extends React.Component {

  store = this.props.store;

  constructor(props) {
    super(props);
  }

  // 组件周期（完成）
  componentDidMount() {
    /*emitter.on('add', data => {
      this.add(data);
    });

    emitter.on('close', data => {
      this.close(data);
    });

    emitter.on('renderPage', (Page, data) => {
      this.renderPage(Page, data);
    });*/

    // this.importPage();
  }

  handleSelect(data) {
    this.store.selectItem(data.code);
    router.setURL(data.url);
  }

  // 关闭
  handleClose(data) {
    let index = this.store.removeItem(data.code);
    if (index > -1 && data.active) {
      // 重置上一个为选中
      let n = Math.min(index, this.store.items.length - 1);
      let url = '/';
      if (this.store.items[ n ]) {
        this.store.items[ n ].active = true;
        url = this.store.items[ n ].url;
      }
      router.setURL(url);
    }
  }

  // 渲染页面
  renderPage(Page, data) {
    ReactDOM.render(
        <Page data={data} />,
        this.refs[ data.code ]
      );
  }

  render() {
    let w = `calc(${100 / this.store.items.length}% - 2px)`;
    return (
        <div className="content">
          <div className="content-header">
          {
            this.store.items.map((item, index) => {
              return (
                  <div key={item.code} 
                    className={
                      classnames('content-header-item', item.active ? 'active' : '')
                    }
                    style={{
                      width: w
                    }}
                  >
                    <div 
                      className="content-header-title" 
                      onClick={this.handleSelect.bind(this, item)}
                      title={item.title}
                    >
                      {item.title}
                    </div>
                    <Close onClick={this.handleClose.bind(this, item)}></Close>
                  </div>
                )
            })
          }
          </div>
          <div className="content-body">
          {
            this.store.items.map((item, index) => {
              return (
                  <div className="content-body-item" key={item.code} style={
                    { display: item.active ? '' : 'none' }
                  }>
                    {item.PageNode}
                  </div>
                );
            })
          }
          </div>
        </div>
      )
  }
}

export default PageTabs;