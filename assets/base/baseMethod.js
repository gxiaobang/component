/**
 * 扩展类
 * @author gxiaobang
 */

class BaseMethod {

	constructor() {
		this.fn = {};
	}

	// 初始化监听事件
	initFn(...args) {
		forEach(args, (name) => {
			this.fn[ name ] = [];
		});
	}

	// 安装事件
	on(type, fn) {
		if (isArray(this.fn[ type ])) {
			this.fn[ type ].push( fn );
		}
		return this;
	}
	// 卸载事件
	un(type, fn) {
		if (isArray(this.fn[ type ])) {
			if (fn) {
				for (let i = 0, f; f = this.fn[ type ][ i ]; i++) {
					if (f === fn) {
						this.fn[ type ].splice(i, 1);
						i--;
					}
				}
			}
			else {
				this.fn[ type ].length = 0;
			}
		}
		return this;
	}

	// 修改设置属性
	set(prop, value) {
		this[ prop ] = value;
	}
	// 修改添加属性
	add(prop, value) {
		if (isArray(this[ prop ])) {
			this[ prop ].push(value);
		}
	}

	// 触发事件
	trigger(fn, obj, ...args) {
		var result;
		if (isFunction(fn)) {
			result = fn.call(obj, ...args);
		}
		else if (isArray(fn)) {
			fn.forEach((f) => {
				result = f.call(obj, ...args);
				return result;
			});
		}

		return result !== false;
	}
}

export default BaseMethod;