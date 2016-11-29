/**
 * 主页
 * @author gxiaobang
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, Hello } from '@components';
import '@styles/home';


class Menu extends React.Component {

	static defaultProps = {
		title: '菜单'
	}

	static propTypes = {
		title: React.PropTypes.string.isRequired
	}

	state = {
		title: 1
	}

	constructor(props) {
		super(props);

		// console.log(props);

		// props.title = '菜单';
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
						this.props.data.map((item, index) => {
							return <li key={index} onClick={this.handleClick.bind(this, item)}>{item.name}</li>
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


class Home extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
				<div>
					<Menu title="标题" data={
						[
							{ name: '菜单一', url: '/aaa/index' },
							{ name: '菜单二', url: '/bbb/index' },
							{ name: '菜单三', url: '/ccc/index' }
						]	
					}></Menu>
					<PageTab></PageTab>
				</div>
			)
	}
}


// 包装接口
const home = {
	init() {
		ReactDOM.render(
			<Home />,
			document.querySelector('#home')
		);
	}
};

global.home = home;