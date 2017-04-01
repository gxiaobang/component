/**
 * 加载中测试
 */

import React from 'react';
import Spin from '@components/spin';

class Page extends React.Component {

	render() {
		return (
				<div className="page">
					<h3>{this.props.data.title}测试</h3>
					<div>
						<Spin />
					</div>
				</div>
			)
	}
}

export default Page;