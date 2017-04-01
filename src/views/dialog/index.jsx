/**
 * 弹窗测试
 */

import React from 'react';
import dialog from '@components/dialog';

class Page extends React.Component {

	handleClick() {
		dialog.alert('测试弹窗', 'warn');
	}

	render() {
		return (
				<div className="page">
					<h3>{this.props.data.title}组件</h3>
					<div>
						<button onClick={this.handleClick}>弹窗测试</button>
					</div>
				</div>
			)
	}
}

export default Page;