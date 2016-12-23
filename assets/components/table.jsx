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
					<tr>
						{
							objectmap()
						}
					</tr>
				</table>
			)
	}
}