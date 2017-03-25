/**
 * 菜单
 */

import React from 'react';
import { observer } from 'mobx-react';
import { Todo } from 'store/home';
import history from 'lib/history';

// 菜单
@observer
class Menu extends React.Component {

	store = this.props.store;

	constructor(props) {
		super(props);
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

		history.setURL(data.url);
	}

	render() {
		return (
				<section className="menu">
					<ul>
					{
						this.store.all.map((item, index) => {
							return <li key={index} className={
									this.store.currentCode == item.code ? 'active' : ''
								} onClick={this.handleClick.bind(this, item)}>{item.title}</li>
						})
					}
					</ul>
				</section>
			)
	}
}

export default Menu;