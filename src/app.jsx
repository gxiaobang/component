/**
 * 主页
 * by gxiaobang
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { TodoList } from 'stores/home';

import Home from 'views/home';
import Login from 'views/login';


if (!global.token) {
  const store = new TodoList;
  ReactDOM.render(
    <Home store={store} />,
    document.querySelector('#app')
  );
}
else {
  ReactDOM.render(
    <Login />,
    document.querySelector('#app')
  );
}