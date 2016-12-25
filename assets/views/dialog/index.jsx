/**
 * 弹窗测试
 */

import React from 'react';
import { Dialog as dialog } from 'components';

class Page extends React.Component {

	handleClick() {
		dialog.alert('测试弹窗', 'warn');
	}

	render() {
		return (
				<div className="page">
					<h3>{this.props.data.title}测试</h3>
					<div>
						<button onClick={this.handleClick}>弹窗测试</button>
					</div>
				</div>
			)
	}
}

export default Page;