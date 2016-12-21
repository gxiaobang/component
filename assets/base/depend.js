/**
 * 文件依赖
 * @author gxiaobang
 * @version 0.1.0
 */
import utils from '@base/utils';

// 导入Script
function createScript(src, fn) {
	var script = document.createElement('script');
	script.src = src;

	script.onload = function() {
		fn && fn();
	};

	document.head.appendChild(script);

	return script;
}

var depend = {
	version: '0.1.0',
	mods: [],
	// 加载中的模块
	_temp: [],

	// 移除临时模块
	_removeTemp(name) {
		for (let i = 0; i < this._temp.length; i++) {
			if (this._temp[i] == name) {
				this._temp.splice(i, 1);
				return true;
			}
		}
		return false;
	},

	// 查找模块
	_find(name) {
		for (let i = 0; i < this.mods.length; i++) {
			if (this.mods[i].name == name) {
				return this.mods[i];
			}
		}
		return null;
	},

	// 模块是否加载
	_has(name) {
		for (let i = 0; i < this.mods.length; i++) {
			if (this.mods[i].name == name) {
				return true;
			}
		}
		return false;
	},

	// 添加模块
	_add(name, exports) {
		this.mods.push({ name, exports });
	},

	// 获取模块名
	_getName(src) {
		return src.replace(this.baseUrl, '')
							.replace(/\.(js|css)$/, '');
	},

	// 获取路径
	_getSrc(name) {
		return this.baseUrl + name + '.js';
	},

	// 反馈结果
	_feedback(name, fn) {
		var data = this._find(name);
		fn && fn(data.exports);
	},

	// 配置
	config(option) {
		for (var name in option) {
			switch (name) {
				case 'baseUrl':
					this[ name ] = option[ name ];
					break;
			}
		}
	},
	// 定义模块
	define(fn) {
		var script = document.currentScript;
		// console.log(script)
		var name = script.getAttribute('data-requiremodule');
		this._add(name, fn && fn());
	},
	// 加载模块
	require(name, fn) {
		if (!this._has(name)) {
			if (this._temp.indexOf(name) == -1) {
				this._temp.push(name);
				var script = createScript(this._getSrc(name));

				script.setAttribute('data-requiremodule', name);

				script.onload = () => {
					this._removeTemp(name);
					this._feedback(name, fn);
				};

				script.onerror = () => {
					this._removeTemp(name);
				};
			}
		}
		else {
			this._feedback(name, fn);
		}
	}
};


global.depend = depend;

export default depend;