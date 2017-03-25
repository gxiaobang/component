/**
 * 主页
 */

import React from 'react';
import Menu from 'pages/_includes/menu';
import PageTab from 'pages/_includes/page-tab';
import Header from 'pages/_includes/header';
import { observer } from 'mobx-react';
import { Todo } from 'store/home';
import history from 'lib/history';
import 'styles/home';


@observer
class Home extends React.Component {

	store = this.props.store;

	constructor(props) {
		super(props);
	}

	// 组件周期（完成）
	componentDidMount() {
		this.initPage();
	}

	// 初始化路由页面
	initPage() {
		let url = history.getURL();
		for (let i = 0; i < this.store.all.length; i++) {
			if (this.store.all[i].url == url) {
				this.store.addItem(this.store.all[i]);
				break;
			}
		}
	}

	render() {
		return (
				<div>
					<Header />
					<section>
						<Menu store={this.store} />
						<PageTab store={this.store} />
					</section>
				</div>
			);
	}
}

export default Home;