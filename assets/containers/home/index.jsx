/**
 * 主页
 */

import React from 'react';
import Menu from 'containers/menu';
import PageTab from 'containers/pageTab';
import emitter from 'emitter/home';
import 'styles/home';


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

		emitter.subscribe('update', (Page, data) => {
			// this.renderPage(Page, data);
			this.update();
		});
		// console.log
		this.initPage();
	}

	// 初始化路由页面
	initPage() {
		let url = window.location.hash.replace(/^#/, '');
		for (let i = 0; i < this.state.data.length; i++) {
			if (this.state.data[i].url == url) {
				emitter.dispatch('add', this.state.data[i]);
				break;
			}
		}
	}

	// 更新菜单状态
	update() {
		this.setState({
			data: this.state.data
		});
	}

	render() {
		return (
				<div>
					<h2>测试</h2>
					<Menu data={this.state.data} />
					<PageTab />
				</div>
			);
	}
}

export default Home;