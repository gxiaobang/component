/**
 * 按钮
 */

import React from 'react';

class Page extends React.Component {

	handleClick() {
		console.log('我被点击了');
	}

	render() {
		return (
				<div className="page">
					<h3>{this.props.data.title}组件</h3>
					<div>
						<button type="buton" onClick={
							() => { this.handleClick(); }
						}>按钮</button>
					</div>
				</div>
			)
	}
}

export default Page;