/**
 * 主页
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { MenuList } from 'stores/home';
import cache from 'stores/cache';

import Home from 'views/home';
import Login from 'views/login';

import router from 'utils/router';

if (router.getURL() == '/login') {
  ReactDOM.render(
    <Login />,
    document.querySelector('#app')
  );
}
else {
  const store = new MenuList;
  cache.homeStore = store;
  ReactDOM.render(
    <Home store={store} />,
    document.querySelector('#app')
  );
}