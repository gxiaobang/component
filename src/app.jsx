/**
 * 主页
 */
// import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { MenuStore } from '@/stores/home';
import Home from '@/views/home';
import Login from '@/views/login';
import router from '@/utils/router';

if (router.getURL() == '/login') {
  ReactDOM.render(
    <Login />,
    document.querySelector('#app')
  );
}
else {
  const store = new MenuStore;
  ReactDOM.render(
    <Home store={store} />,
    document.querySelector('#app')
  );
}