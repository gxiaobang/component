/**
 * 弹窗测试
 */

import React from 'react';
import { Dialog } from '@components';

class Page extends React.Component {

	handleClick() {
		Dialog.alert('测试弹窗', 'warn');
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