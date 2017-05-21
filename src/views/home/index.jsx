/**
 * 主页
 */

import React from 'react';
import { observer } from 'mobx-react';

import Menu from 'layouts/Menu';
import Content from 'layouts/Content';
import Header from 'layouts/Header';
import Main from 'layouts/Main';
import router from 'utils/router';
import './style';

/*router.listen(event => {
	console.log(event);
});*/


@observer
class Home extends React.Component {

	store = this.props.store;

	constructor(props) {
		super(props);
	}

	// 组件周期（完成）
	componentDidMount() {
		// this.initPage();
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
				<div className="home">
					<Header />
					<Main>
						<Menu store={this.store} />
						<Content store={this.store} />
					</Main>
				</div>
			);
	}
}

export default Home;