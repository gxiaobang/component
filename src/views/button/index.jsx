/**
 * 按钮
 */

import React from 'react';
import { Button } from 'components';

class Page extends React.Component {

	handleClick() {
		console.log('我被点击了');
	}

	render() {
		return (
				<div className="page">
					<h3>{this.props.data.title}组件</h3>
					<div>
						<Button onClick={
							() => { this.handleClick(); }
						}>按钮</Button>
					</div>
				</div>
			)
	}
}

export default Page;