/**
 * 菜单
 */

/**
 * 菜单
 */

import React from 'react';
import emitter from 'emitter/home';

// 菜单
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
							return <li key={index} className={item.active ? 'active' : ''} onClick={this.handleClick.bind(this, item)}>{item.title}</li>
						})
					}
					</ul>
				</section>
			)
	}
}

export default Menu;