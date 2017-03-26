/**
 * 消息测试
 */

import React from 'react';
import message from 'components/message';

class Page extends React.Component {

	handleClick() {
		// Dialog.alert('测试弹窗', 'warn');
		message.show('消息测试', 'warn');
	}

	render() {
		return (
				<div className="page">
					<h3>{this.props.data.title}组件</h3>
					<div>
						<button onClick={this.handleClick}>消息测试</button>
					</div>
				</div>
			)
	}
}

export default Page;