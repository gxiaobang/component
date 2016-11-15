/**
 * 主页
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, Hello } from '@components';
import '@styles/home';

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

	static defaultProps: {
		title: '菜单'
	}

	constructor() {
		super();
		// console.log(props)
		// this.status = {};
		this.pageInit();
	}

	pageInit() {
		this.pageTab = ReactDOM.render(
				<PageTab />,
				document.querySelector('#pageTab')
			);
	}

	handleClick(item) {
		// console.log(this.pageTab)
		var that = this;
		for (let i = 0; i < this.pageTab.state.pages.length; i++) {
			if (this.pageTab.state.pages[i].url == item.url) {
				console.log('page loaded');
				return;
			}
		}

		this.pageTab.state.pages.forEach(item => item.isActive = false);
		var data = {
			title: item.text,
			url: item.url,
			code: item.code,
			isActive: true
		};
		this.pageTab.state.pages.push(data);
		this.pageTab.setState({
			pages: this.pageTab.state.pages
		});

		// console.log(this.pageTab.refs);
		requirejs(['action/' + data.url], (Page) => {
			// console.log(Page);

			ReactDOM.render(
					<Page text={data.text} />,
					// data.body
					that.pageTab.refs[ data.code ]
				);
		});
	}

	render() {
		return (
				<section className="menu">
					<h2>{this.props.title}</h2>
					<ul>
					{
						this.props.list.map(item => {
							return <li onClick={this.handleClick.bind(this, item)}>{item.text}</li>
						})
					}
					</ul>
				</section>
			)
	}
}

class PageTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pages: []
		};
	}

	render() {
		return (
				<div className="content">
					<div className="content-header">
					{
						this.state.pages.map(item => {
							return (
									<div>
										{item.title}
										<div className="close" onClick={this.close.bind(this, item)}>&times;</div>
									</div>
								)
						})
					}
					</div>
					<div className="content-body">
					{
						this.state.pages.map(item => {
							return (
									<div ref={item.code} style={
										{ display: item.isActive ? '' : 'none' }
									}></div>
								);
						})
					}
					</div>
				</div>
			)
	}

	// 关闭
	close(item) {
		for (let i = 0; i < this.state.pages.length; i++) {
			if (this.state.pages[ i ] == item) {
				this.state.pages.splice(i, 1);
				this.setState({
					pages: this.state.pages
				});
				return true;
			}
		}
		return false;
	}
}




const home = {
	init() {
		ReactDOM.render(
			<Menu list={[
					{ text: 'aaa', url: 'aaa/index', code: 'aaa' },
					{ text: 'bbb', url: 'bbb/index', code: 'bbb' },
					{ text: 'ccc', url: 'ccc/index', code: 'ccc' }
				]} />,
			document.querySelector('#menu')
		);
	}
};

global.home = home;