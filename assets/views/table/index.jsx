/**
 * 消息测试
 */

import React from 'react';
import { Table } from '@components';

class Page extends React.Component {

	render() {

		var data = {
			head: {
				filmName: '影片',
				duration: '影片长度',
				date: '开始时间'
			},
			items: [
				{
					filmName: '影片1',
					duration: '100',
					date: '09:00'
				},
				{
					filmName: '影片2',
					duration: '110',
					date: '10:00'
				},
				{
					filmName: '影片3',
					duration: '120',
					date: '09:00'
				},
				{
					filmName: '影片4',
					duration: '100',
					date: '12:00'
				},
				{
					filmName: '影片5',
					duration: '110',
					date: '14:00'
				},
				{
					filmName: '影片6',
					duration: '100',
					date: '15:00'
				}
			],
			page: {
				count: 100,
				size: 20,
				index: 1
			}
		};

		return (
				<div className="page">
					<h3>{this.props.data.title}测试</h3>
					<div>
						<Table data={
							data
						} />
					</div>
				</div>
			)
	}
}

export default Page;