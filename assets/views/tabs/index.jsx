/**
 * 标签页测试
 */

import React from 'react';
// import { Tabs } from '@components';

class Page extends React.Component {

	render() {

		return (
				<div className="page">
					<h3>{this.props.data.title}测试</h3>
					<div>

					</div>
				</div>
			)
	}
}

export default Page;