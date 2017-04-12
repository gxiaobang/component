/**
 * 分页组件
 */

import React from 'react';
import { Pagination } from 'components';

class Page extends React.Component {

	render() {

		return (
				<div className="page">
					<h3>{this.props.data.title}组件</h3>
					<div>
						<Pagination />
					</div>
				</div>
			)
	}
}

export default Page;