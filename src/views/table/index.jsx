/**
 * 表格组件
 */

import React from 'react';
import { Table, Link } from '@/components';

class Page extends React.Component {

	handleClick(record) {
		console.log(record);
	}

	handleDelete() {
		
	}

	render() {
		const columns = [
			{ title: '影片', key: 'filmName' },
			{ title: '影片长度', key: 'duration' },
			{ title: '时间', key: 'date' },
			{ title: '操作', key: 'action', 
				render: (text, record) => {
					return (
						<div>
							<Link onClick={this.handleClick.bind(this, record)}>修改</Link>
							<Link type="danger" onClick={this.handleDelete.bind(this)}>删除</Link>
						</div>
					);
				}
			}
		];

		const data = [
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
		];

		return (
				<div className="page">
					<h3>{this.props.data.title}组件</h3>
					<div>
						<Table columns={columns} data={data} pagination={{ index: 1, size: 20, total: 200 }} />
					</div>
				</div>
			)
	}
}

export default Page;