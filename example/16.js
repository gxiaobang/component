webpackJsonp([16],{594:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(1),i=function(e){return e&&e.__esModule?e:{default:e}}(u),f=n(19),c=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),a(t,[{key:"handleAlert",value:function(){f.Dialog.alert("测试弹窗","warn")}},{key:"handleConfirm",value:function(){f.Dialog.confirm("测试弹窗","info")}},{key:"handleOpen",value:function(){f.Dialog.open("/dialog/info",{data:123},"编辑")}},{key:"render",value:function(){return i.default.createElement("div",{className:"page"},i.default.createElement("h3",null,this.props.data.title,"组件"),i.default.createElement("p",null,i.default.createElement(f.Button,{onClick:this.handleAlert,type:"default"},"alert")),i.default.createElement("p",null,i.default.createElement(f.Button,{onClick:this.handleConfirm,type:"default"},"confirm")),i.default.createElement("p",null,i.default.createElement(f.Button,{onClick:this.handleOpen,type:"default"},"open")))}}]),t}(i.default.Component);t.default=c}});