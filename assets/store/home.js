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
		System.import('pages/' + data.url + '.jsx')
			.then(module => {
				// console.log(module)
				const Page = module.default;
				this.PageNode = <Page data={data} />;
			})
			.catch(err => {
				console.log('加载失败');
			});
	}
}

class TodoList {
	// 打开的菜单
	@observable items = [];
	// 所有的菜单
	@observable all = [
		{
			title: '弹窗', url: 'dialog/index', code: 'dialog'
		},
		{
			title: '消息', url: 'message/index', code: 'message'
		},
		{
			title: '标签页', url: 'tabs/index', code: 'tabs'
		}
	];

	@computed get currentCode() {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[ i ].active) {
				this.items[ i ].code;
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