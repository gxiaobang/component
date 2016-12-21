/**
 * 消息测试
 */

import React from 'react';
import { Message } from '@components';

class Page extends React.Component {

	handleClick() {
		// Dialog.alert('测试弹窗', 'warn');
		Message.show('消息测试', 'warn');
	}

	render() {
		return (
				<div className="page">
					<h3>消息测试</h3>
					<div>
						<button onClick={this.handleClick}>消息测试</button>
					</div>
				</div>
			)
	}
}

export default Page;