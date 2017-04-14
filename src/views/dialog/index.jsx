/**
 * 弹窗测试
 */

import React from 'react';
import { Dialog, Button, Icon } from 'components';

class Page extends React.Component {

	handleClick() {
		Dialog.alert('测试弹窗', 'warn');
	}

	render() {
		return (
				<div className="page">
					<h3>{this.props.data.title}组件</h3>
					<div>
						<Button onClick={this.handleClick}>弹窗测试</Button>
					</div>
				</div>
			)
	}
}

export default Page;