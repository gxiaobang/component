/**
 * 标签页测试
 */

import React from 'react';
import Tabs from 'components/tabs';

const TabPane = Tabs.TabPane;

class Page extends React.Component {

	render() {

		return (
				<div className="page">
					<h3>{this.props.data.title}组件</h3>
					<div>
						<Tabs>
							<TabPane tab="tab 1">内容一</TabPane>
							<TabPane tab="tab 2">内容二</TabPane>
							<TabPane tab="tab 3">内容三</TabPane>
						</Tabs>
					</div>
				</div>
			)
	}
}

export default Page;