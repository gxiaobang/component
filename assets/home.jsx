/**
 * 主页
 * @author gxiaobang
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, Hello } from '@components';
import EventEmitter from '@base/eventEmitter';
import depend from '@base/depend';
import '@styles/home';

var emitter = new EventEmitter();

// 菜单（读取菜单）
class Menu extends React.Component {

	static defaultProps = {
		title: '菜单'
	}

	static propTypes = {
		title: React.PropTypes.string.isRequired
	}

	state = {
		pages: []
	}

	constructor(props) {
		super(props);

		// console.log(props);

		// props.title = '菜单';
	}

	handleClick(item) {
		// console.log(this.pageTab)
		var that = this;
		var data = {
			title: item.text,
			url: item.url,
			code: item.code,
			active: true
		};
		emitter.dispatch('add', data);


		// prod 读取assetsmap
		// require加载页面jsx
		depend.require(['page' + data.url], (Page) => {
			// console.log(Page);
			emitter.dispatch('renderPage', Page, data);
		});
	}

	render() {
		return (
				<section className="menu">
					<h2>{this.props.title}</h2>
					<ul>
					{
						this.props.data.map((item, index) => {
							return <li key={index} onClick={this.handleClick.bind(this, item)}>{item.name}</li>
						})
					}
					</ul>
				</section>
			)
	}
}

// 菜单页面渲染和tabs切换
class PageTab extends React.Component {
	state = {
		pages: []
	}

	constructor(props) {
		super(props);
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
									<div key={index}>
										{data.title}
										<div className="close" onClick={this.close.bind(this, data)}>&times;</div>
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
									}></div>
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

	add(data) {
		this.clearSelect();

		if (this.hasAdded(data.code)) {
			this.getPageData(data.code).active = true;
		}
		else {
			this.state.pages.push(data);
		}

		this.setState({ pages: this.state.pages });
	}

	// 关闭
	close(data) {
		for (let i = 0; i < this.state.pages.length; i++) {
			if (this.state.pages[ i ] == data) {
				this.state.pages.splice(i, 1);
				this.setState({
					pages: this.state.pages
				});
				return true;
			}
		}
		return false;
	}

	// 渲染页面
	renderPage(Page, data) {
		ReactDOM.render(
				<Page data={data} title={data.title} />,
				this.refs[ data.code ]
			);
	}
}


class Home extends React.Component {
	render() {
		return (
				<div>
					<Menu title="标题" data={
						[
							{ name: '菜单一', url: '/aaa/index', code: 'a' },
							{ name: '菜单二', url: '/bbb/index', code: 'b' },
							{ name: '菜单三', url: '/ccc/index', code: 'c' }
						]	
					} />
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