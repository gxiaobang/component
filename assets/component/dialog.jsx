/**
 * 弹框
 * @author gxiaobang
 * @version 0.1.0
 */

import React from 'react';

class Dialog extends React.Component {
	render() {
		return (
				<div className="dialog">
					<header>{this.props.title}</header>
					<section>
						{this.props.message}
					</section>
					<footer>
						{
							this.props.btns.map((item) => {
								return <button className={item.cls}>{item.text}</button>
							})
						}
					</footer>
				</div>
			)
	}
}

export default Dialog;