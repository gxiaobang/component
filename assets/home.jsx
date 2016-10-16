/**
 * 主页
 */

import ReactDOM from 'react-dom';
import { Dialog } from 'component';

window.onload = function() {
	ReactDOM.render(
			<Dialog 
				title="提示框" 
				btns={
					[ { cls: 'primary', text: '确定' } ]
				}
				message="内容提示"
			/>,
			document.querySelector('#dialog')
		)
};