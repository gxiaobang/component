/**
 * tabs页
 */
import React from 'react';
import emitter from 'emitter/home';

// tabs切换
class PageTab extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			pages: []
		};
	}

	// 组件周期（完成）
	componentDidMount() {
		emitter.subscribe('add', data => {
			this.add(data);
		});

		emitter.subscribe('close', data => {
			this.close(data);
		});

		emitter.subscribe('renderPage', (Page, data) => {
			this.renderPage(Page, data);
		});
	}

	render() {
		return (
				<div className="content">
					<div className="content-header">
					{
						this.state.pages.map((data, index) => {
							return (
									<div key={index} className={
										data.active ? 'selected' : ''
									}>
										<div className="content-header-title" onClick={this.select.bind(this, data)}>
											{data.title}
										</div>
										<span className="close" onClick={this.close.bind(this, data)}>&times;</span>
									</div>
								)
						})
					}
					</div>
					<div className="content-body">
					{
						this.state.pages.map((data, index) => {
							return (
									<div key={index} ref={data.code} style={
										{ display: data.active ? '' : 'none' }
									}>
										{data.page}
									</div>
								);
						})
					}
					</div>
				</div>
			)
	}

	// 获取菜单页面data
	getPageData(code) {
		// 有添加过
		for (let i = 0; i < this.state.pages.length; i++) {
			if (this.state.pages[i].code == code) {
				return this.state.pages[i];
			}
		}
	}

	// 有添加过
	hasAdded(code) {
		for (let i = 0; i < this.state.pages.length; i++) {
			if (this.state.pages[i].code == code) {
				return true;
			}
		}

		return false;
	}

	// 清除选中
	clearSelect() {
		this.state.pages.forEach(data => data.active = false);
	}

	select(data) {
		this.clearSelect();
		data.active = true;
		this.setHash(data.url);
		emitter.dispatch('update');
		this.setState({
			pages: this.state.pages
		});
	}

	add(data) {
		this.setHash(data.url);	

		this.clearSelect();
		if (this.hasAdded(data.code)) {
			this.getPageData(data.code).active = true;
			this.setState({ pages: this.state.pages });
		}
		else {
			data.active = true;
			this.state.pages.push(data);
			this.update();
			// this.setState({ pages: this.state.pages });
			/*depend.require(path, (Page) => {
				data.page = <Page data={data} />;
				this.setState({ pages: this.state.pages });
			});*/


			// var path = assetsmap['/page' + data.url].js.replace(/\.(js|css)$/, '');
			/*require(`bundle?lazy!../../views${data.url}`)(bundle => {
				let Page = bundle.default;
				data.page = <Page data={data} />;
				this.update();
			});*/
		}

		emitter.dispatch('update');
	}

	// 关闭
	close(data) {
		for (let i = 0; i < this.state.pages.length; i++) {
			let item = this.state.pages[ i ];
			if (item == data) {
				this.state.pages.splice(i, 1);

				if (item.active) {
					item.active = false;

					// 重置上一个为选中
					let n = Math.max(i - 1, 0);
					let url = '/';
					if (this.state.pages[ n ]) {
						this.state.pages[ n ].active = true;
						url = this.state.pages[ n ].url;
					}

					this.setHash(url);
					emitter.dispatch('update');
				}

				this.update();
				// return true;
			}
		}
		return false;
	}

	// 渲染页面
	renderPage(Page, data) {
		ReactDOM.render(
				<Page data={data} />,
				this.refs[ data.code ]
			);
	}

	setHash(url) {
		window.location.hash = '#' + url;
	}

	// 更新数据
	update() {
		this.setState({ pages: this.state.pages });
	}
}

export default PageTab;