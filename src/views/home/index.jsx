/**
 * 主页
 */

import React from 'react';
import { observer } from 'mobx-react';

import Menu from '@containers/menu';
import PageTab from '@containers/page-tab';
import Header from '@containers/header';
import router from '@lib/router';
import '@styles/home';

router.listen(event => {
	console.log(event);
});


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
		let url = router.getURL();
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