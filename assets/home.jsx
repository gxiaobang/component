/**
 * 主页
 * @author gxiaobang
 */

import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory } from 'react-router';
import { Dialog, Hello } from 'components';
import EventEmitter from 'base/eventEmitter';
// import depend from 'base/depend';
import 'styles/home';

var emitter = new EventEmitter();

// 菜单（读取菜单）
class Menu extends React.Component {

	static defaultProps = {
		title: '菜单'
	};

	static propTypes = {
		title: React.PropTypes.string.isRequired
	};


	constructor(props) {
		super(props);

		// console.log(props);

		this.state = {
			pages: []
		};
	}

	handleClick(data) {
		// console.log(this.pageTab)
		var that = this;
		emitter.dispatch('add', data);
	}

	render() {
		return (
				<section className="menu">
					<ul>
					{
						this.props.data.map((item, index) => {
							return <li key={index} onClick={this.handleClick.bind(this, item)}>{item.title}</li>
						})
					}
					</ul>
				</section>
			)
	}
}

// 菜单页面渲染和tabs切换
class PageTab extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			pages: []
		};
	}

	// 组件周期（完成）
	componentDidMount() {
		emitter.subscribe('add', data => {
			this.add(data);
		});

		emitter.subscribe('close', data => {
			this.close(data);
		});

		emitter.subscribe('renderPage', (Page, data) => {
			this.renderPage(Page, data);
		});
	}

	render() {
		return (
				<div className="content">
					<div className="content-header">
					{
						this.state.pages.map((data, index) => {
							return (
									<div key={index} className={
										data.active ? 'selected' : ''
									}>
										<div className="content-header-title" onClick={this.select.bind(this, data)}>
											{data.title}
										</div>
										<span className="close" onClick={this.close.bind(this, data)}>&times;</span>
									</div>
								)
						})
					}
					</div>
					<div className="content-body">
					{
						this.state.pages.map((data, index) => {
							return (
									<div key={index} ref={data.code} style={
										{ display: data.active ? '' : 'none' }
									}>
										{data.page}
									</div>
								);
						})
					}
					</div>
				</div>
			)
	}

	// 获取菜单页面data
	getPageData(code) {
		// 有添加过
		for (let i = 0; i < this.state.pages.length; i++) {
			if (this.state.pages[i].code == code) {
				return this.state.pages[i];
			}
		}
	}

	// 有添加过
	hasAdded(code) {
		for (let i = 0; i < this.state.pages.length; i++) {
			if (this.state.pages[i].code == code) {
				return true;
			}
		}

		return false;
	}

	// 清除选中
	clearSelect() {
		this.state.pages.forEach(data => data.active = false);
	}

	select(data) {
		this.clearSelect();
		data.active = true;
		this.setHash(data.url);
		this.setState({
			pages: this.state.pages
		});
	}

	add(data) {
		this.setHash(data.url);	

		this.clearSelect();
		if (this.hasAdded(data.code)) {
			this.getPageData(data.code).active = true;
			this.setState({ pages: this.state.pages });
		}
		else {
			data.active = true;
			this.state.pages.push(data);
			this.update();
			// this.setState({ pages: this.state.pages });
			/*depend.require(path, (Page) => {
				data.page = <Page data={data} />;
				this.setState({ pages: this.state.pages });
			});*/


			// var path = assetsmap['/page' + data.url].js.replace(/\.(js|css)$/, '');
			require(`bundle?lazy!./views${data.url}`)(bundle => {
				let Page = bundle.default;
				data.page = <Page data={data} />;
				this.update();
			});
		}
	}

	// 关闭
	close(data) {
		for (let i = 0; i < this.state.pages.length; i++) {
			let item = this.state.pages[ i ];
			if (item == data) {
				this.state.pages.splice(i, 1);

				if (item.active) {
					// 重置上一个为选中
					let n = Math.max(i - 1, 0);
					let url = '/';
					if (this.state.pages[ n ]) {
						this.state.pages[ n ].active = true;
						url = this.state.pages[ n ].url;
					}

					this.setHash(url);
				}

				this.update();
				return true;
			}
		}
		return false;
	}

	// 渲染页面
	renderPage(Page, data) {
		ReactDOM.render(
				<Page data={data} />,
				this.refs[ data.code ]
			);
	}

	setHash(url) {
		window.location.hash = '#' + url;
	}

	// 更新数据
	update() {
		this.setState({ pages: this.state.pages });
	}
}


class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ title: '弹窗', url: '/dialog/index', code: 'dialog' },
				{ title: '消息', url: '/message/index', code: 'message' },
				{ title: '标签页', url: '/tabs/index', code: 'tabs' }
			]
		};
	}

	// 组件周期（完成）
	componentDidMount() {
		// console.log
		let url = window.location.hash.replace(/^#/, '');
		for (let i = 0; i < this.state.data.length; i++) {
			if (this.state.data[i].url == url) {
				emitter.dispatch('add', this.state.data[i]);
				break;
			}
		}
	}

	render() {
		return (
				<div>
					<h2>组件测试</h2>
					<Menu data={this.state.data} />
					<PageTab />
				</div>
			);
	}
}

// 组件通信
/*class Parent extends React.Component {
	state = {
		checked: true
	}
	handler() {
		this.state.checked = !this.state.checked;
		this.setState({
			checked: this.state.checked
		})
	}
	render() {
		return (
				<div>
					<div onClick={this.handler.bind(this)}>click me!</div>
					<Child checked={this.state.checked} />
				</div>
			);
	}
}

class Child extends React.Component {

	render() {
		console.log(this.props.checked)
		return <div>it's checked. {this.props.checked.toString()}</div>
	}
}*/

// 包装接口
const home = {
	init() {
		ReactDOM.render(
			<Home />,
			document.querySelector('#home')
		);
	}
	/*init() {
		ReactDOM.render(
			<Parent />,
			document.querySelector('#home')
		);
	}*/
};

global.home = home;