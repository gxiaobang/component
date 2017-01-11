/**
 * 主页
 * @author gxiaobang
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'containers/home';
import emitter from 'emitter/home';


// 包装接口
ReactDOM.render(
	<Home />,
	document.querySelector('#app')
);