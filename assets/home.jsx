/**
 * 主页
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, Hello } from 'component';

ReactDOM.render(
		<Dialog 
			title="提示框" 
			btns={[
				{ 
					cls: 'primary', 
					text: '确定', 
					handler: function() {
						console.log(arguments);
					}
				}
			]}
			message="内容信息"
		/>,
		document.querySelector('#dialog')
	)	