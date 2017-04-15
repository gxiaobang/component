/**
 * 弹窗测试
 */

import React from 'react';
import { Dialog, Button, Icon } from 'components';

class Page extends React.Component {

	handleAlert() {
		Dialog.alert('测试弹窗', 'warn');
	}

	handleConfirm() {
		Dialog.confirm('测试弹窗', 'info');
	}

	render() {
		return (
				<div className="page">
					<h3>{this.props.data.title}组件</h3>
					<div style={{ lineHeight: 2 }}>
						<Button onClick={this.handleAlert}>alert测试</Button>
					</div>
					<div style={{ lineHeight: 2 }}>
						<Button onClick={this.handleConfirm}>confirm测试</Button>
					</div>
				</div>
			)
	}
}

export default Page;