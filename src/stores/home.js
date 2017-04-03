/**
 * home store
 */

import React from 'react';
import { observable, computed } from 'mobx';
// import {observer} from 'mobx-react';

class Todo {
	id = Math.random();

	@observable title = '';
	@observable url = '';
	@observable code = '';
	@observable active = false;
	@observable PageNode = <div>加载中...</div>;
	constructor({ title, url, code, active = false }) {

		const data = { title, url, code, active };
		Object.assign(this, data);
		this.importPage(data);
	}

	// 导入页面
	importPage(data) {
		let url = data.url.replace(/^\//, '').replace(/\?(\w|\/|=){0,}/, '');
		System.import('views/' + url + '.jsx')
			.then(module => {
				// console.log(module)
				const Page = module.default;
				this.PageNode = <Page data={data} />;
			})
			.catch(err => {
				console.warn('加载失败');
				System.import('views/404')
					.then(module => {
						const Page = module.default;
						this.PageNode = <Page data={data} />;
					})
			});
	}
}

class TodoList {
	// 打开的菜单
	@observable items = [];
	// 所有的菜单
	@observable all = [
		{
			title: __('弹窗'), url: '/dialog/index', code: 'dialog'
		},
		{
			title: __('消息'), url: '/message/index', code: 'message'
		},
		{
			title: __('标签页'), url: '/tabs/index', code: 'tabs'
		},
		{
			title: __('表格'), url: '/table/index', code: 'table'
		},
		{
			title: __('分页'), url: '/pagination/index', code: 'pagination'
		},
		{
			title: __('按钮'), url: '/button/index', code: 'button'
		},
		{
			title: __('加载中'), url: '/spin/index', code: 'spin'
		}
	];

	@computed get currentCode() {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[ i ].active) {
				return this.items[ i ].code;
			}
		}
		return null;
	}


	// 清除选中
	clearSelect() {
		this.items.forEach(item => {
			if (item.active) {
				item.active = false;
			}
		});
	}

	// 选中数据
	selectItem(code) {
		this.items.forEach(item => {
			if (!item.active && item.code == code) {
				this.clearSelect();
				item.active = true;
			}
		});
	}

	// 添加
	addItem(item, isClear = true) {
		if (!this.hasItem(item.code)) {
			// 清除选中
			if (isClear) this.clearSelect();

			this.items.push(
				new Todo({
					...item,
					active: true
				})
			);

			return false;
		}

		return true;
	}

	// 是否添加过
	hasItem(code) {
		return !!this.getItem(code);
	}

	// 获取
	getItem(code) {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].code == code) {
				return this.items[i];
			}
		}
		return null;
	}

	// 移除
	removeItem(code) {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].code == code) {
				this.items.splice(i, 1);
				// return true;
				return i;
			}
		}
		return -1;
	}
}

// const store = new TodoList;

// store.pus(new Todo);

export { Todo, TodoList };