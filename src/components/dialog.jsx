/**
 * 弹框
 * @author gxiaobang
 * @version 0.1.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
// import depend from 'base/depend';
import { addEvent } from '@lib/utils';
// 引入样式
import '@styles/dialog';

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
				<Dialog type="insert" page={page} title={title} />,
				mask
			);
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

	render() {
		return (
				<div className="dialog" ref="dialog">
					<header>
						{this.props.title}
						<span className="close" onClick={this.close.bind(this)}>&times;</span>
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
											onClick={item.handler ? item.handler.bind(this) : null}>
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
	close() {
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