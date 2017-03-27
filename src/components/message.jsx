/**
 * 信息提示
 * @author gxiaobang
 * @version 0.1.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/message';


class Message extends React.Component {
	static show(msg, icon) {

		this.hide();
		if (!Message.element) {
			Message.element = document.createElement('div');
			ReactDOM.render(
					<Message msg={msg} icon={icon} />,
					Message.element
				);
			document.body.appendChild(Message.element);
		}
		Message.element.style.display = '';
		Message.timer = setTimeout(() => {
			this.hide();
		}, 2000);
	}

	static hide() {
		if (Message.element) {
			clearTimeout(Message.timer);
			Message.element.style.display = 'none';
		}
	}

	render() {
		return (
				<div className="message">
					{this.props.msg}
				</div>
			)
	}
}

export default Message;