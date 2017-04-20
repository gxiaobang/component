/**
 * 菜单
 */

import React from 'react';
import { observer } from 'mobx-react';
import router from 'utils/router';
import http from 'utils/http';
import './style';

// 菜单
@observer
class Menu extends React.Component {

	store = this.props.store;

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		http({
			baseURL: '/mock',
			url: '/menu'
		}).then(response => {
			// console.log(data);

			this.store.updateList(response.data.data);
		});
	}

	handleClick(data) {
		// this.store.clearSelect();
		const added = this.store.addItem(data);

		// 已经添加过
		if (added) {
			this.store.selectItem(data.code);
		}
		else {
			
		}

		router.setURL(data.url);
	}

	// 渲染左侧菜单
	renderList() {
		let url = router.getURL();
		return this.store.all.map((item, index) => {
			if (!this.rendered && item.url == url) {
				this.rendered = true;
				// console.log(item)
				setTimeout(() => {
					this.store.addItem(item);
				})
			}
			return <li key={index} className={
					this.store.currentCode == item.code ? 'active' : ''
				} onClick={this.handleClick.bind(this, item)}>{item.title}</li>
		});
	}

	render() {
		return (
				<section className="menu">
					<ul>
					{this.renderList()}
					</ul>
				</section>
			)
	}
}

export default Menu;