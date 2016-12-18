/**
 * 主页
 * @author gxiaobang
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, Hello } from '@components';
import '@styles/home';


class Nav extends React.Component {

	static defaultProps = {
		title: '菜单'
	}

	static propTypes = {
		title: React.PropTypes.string.isRequired
	}

	state = {
		title: 1,
		pages: []
	}

	constructor(props) {
		super(props);

		// console.log(props);

		// props.title = '菜单';
	}

	handleClick(item) {
		// console.log(this.pageTab)
		var that = this;

		console.log(this.props.pageTab)

		return;
		for (let i = 0; i < this.pages.length; i++) {
			if (this.pages[i].url == item.url) {
				console.log('page loaded');
				return;
			}
		}

		this.pages.forEach(item => item.isActive = false);
		var data = {
			title: item.text,
			url: item.url,
			code: item.code,
			isActive: true
		};
		this.pages.push(data);
		/*this.setState({
			pages: this.pages
		});*/

		// console.log(this.refs);
		/*requirejs(['page/' + data.url], (Page) => {
			// console.log(Page);

			ReactDOM.render(
					<Page text={data.text} />,
					// data.body
					this.refs[ data.code ]
				);
		});*/
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
	state = {
		pages: []
	}

	constructor(props) {
		super(props);
	}

	render() {
		/*this.props.callbackParent({
			pageTab: this
		});*/

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

	add(item) {
		this.pages.push(item);
		this.setState({ pages: this.pages });
		this.props.callbackParent({
			pages: this.state.pages
		});
	}

	// 关闭
	close(item) {
		for (let i = 0; i < this.state.pages.length; i++) {
			if (this.state.pages[ i ] == item) {
				this.state.pages.splice(i, 1);
				this.setState({
					pages: this.state.pages
				});
				this.props.callbackParent({
					pages: this.state.pages
				});
				return true;
			}
		}
		return false;
	}
}


class Home extends React.Component {

	state = {
		pages: null
	}

	callbackParent(state) {
		this.setState(state);
	}

	render() {
		
		return (
				<div>
					<Nav title="标题" data={
						[
							{ name: '菜单一', url: '/aaa/index' },
							{ name: '菜单二', url: '/bbb/index' },
							{ name: '菜单三', url: '/ccc/index' }
						]	
					} pageTab={this.state.pageTab} />
					<PageTab callbackParent={this.callbackParent} />
				</div>
			);
	}
}

// 组件通信
/*class Parent extends React.Component {
	state = {
		checked: true
	}
	handler() {
		this.state.checked = !this.state.checked;
		this.setState({
			checked: this.state.checked
		})
	}
	render() {
		return (
				<div>
					<div onClick={this.handler.bind(this)}>click me!</div>
					<Child checked={this.state.checked} />
				</div>
			);
	}
}

class Child extends React.Component {

	render() {
		console.log(this.props.checked)
		return <div>it's checked. {this.props.checked.toString()}</div>
	}
}*/


// 包装接口
const home = {
	init() {
		ReactDOM.render(
			<Home />,
			document.querySelector('#home')
		);
	}
	/*init() {
		ReactDOM.render(
			<Parent />,
			document.querySelector('#home')
		);
	}*/
};

global.home = home;