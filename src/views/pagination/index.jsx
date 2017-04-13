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
						<Pagination data={{ total: 100, index: 1, size: 10 }} onChange={
							(index, record) => {
								console.log(index, record);
							}
						} />
					</div>
				</div>
			)
	}
}

export default Page;