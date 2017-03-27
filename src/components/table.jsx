/**
 * 表格
 * @author gxiaobang
 */

import React from 'react';
import ReactDOM from 'react-dom';

class Table extends React.Component {
	render() {
		return (
				<table>
					<thead>
						<tr>
							<th>标题1</th>
							<th>标题2</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			)
	}
}

export default Table;