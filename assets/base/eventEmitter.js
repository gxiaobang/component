/**
 * 订阅发布
 * @author gxiaobang
 */

class EventEmitter {
	constructor() {
		this.events = {};
	}

	// 订阅
	subscribe(type, fn) {
		if (!this.events[ type ]) {
			this.events[ type ] = [];
		}

		this.events[ type ].push(fn);
	}

	// 发布
	dispatch(type, ...data) {
		if (this.events[ type ]) {
			this.events[ type ].forEach(fn => fn(...data));
		}
	}

	// 取消订阅
	unsubscribe(type, fn) {
		if (this.events[ type ]) {

			if (!fn) {
				this._empty(type);
			}
			else {
				for (let i = 0; i < this.events[ type ].length; i++) {
					if (this.events[ type ][i] == fn) {
						tthis.events[ type ].splice(i, 1);
						i--;
					}
				}
			}
		}
	}
	
	// 清空
	_empty(type) {
		this.events[ type ] = [];
	}
}

// console.log(EventEmitter)

export default EventEmitter;