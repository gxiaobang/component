/**
 * 主页
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, Hello } from 'component';

/*ReactDOM.render(
		<Dialog 
			title="提示框" 
			btns={[
				{ 
					cls: 'primary', 
					text: '确定', 
					handler: function() {
						console.log(arguments);
					}
				}
			]}
			message="内容信息"
		/>,
		document.querySelector('#dialog')
	)	*/

class Menu extends React.Component {
	handleClick(item) {
		// console.log(item);
		requirejs([item.url], (Page) => {
			// console.log(Page);

			ReactDOM.render(
					<Page text={item.text} />,
					document.querySelector('#page')
				);
		});
	}
	render() {
		return (
				<ul className="menu">
				{
					this.props.list.map(item => {
						return <li onClick={this.handleClick.bind(this, item)}>{item.text}</li>
					})
				}
				</ul>
			)
	}
}

ReactDOM.render(
		<Menu list={[
				{ text: '菜单一', url: './build/aaa' },
				{ text: '菜单二', url: './build/bbb' },
				{ text: '菜单三', url: './build/ccc' }
			]} />,
		document.querySelector('#menu')
	)