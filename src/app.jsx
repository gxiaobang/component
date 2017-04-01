/**
 * 主页
 * @author gxiaobang
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Home from '@views/home';
import { TodoList } from '@stores/home';

const store = new TodoList;

// 包装接口
ReactDOM.render(
	<Home store={store} />,
	document.querySelector('#app')
);

/*if (module.hot) {
	module.hot.accept();
}*/