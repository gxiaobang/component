import { ReactDOM } from 'react-dom';
import { Dialog } from 'components';

function createMask() {
	var mask = document.createElement('div');
	mask.className = 'mask';
	return mask;
}

// 提示
['alert', 'confirm', 'prompt'].forEach(type => {
	dialog[type] = (msg = '', icon = 'success', fn) => {
		let mask = createMask();
		let dg = <Dialog type={type} msg={msg} icon={icon} fn={fn} />;
		ReactDOM.render(
				dg,
				mask
			);
		return dg;
	}
});

// 页面加载
dialog.load = (url = '', param = null, fn) => {
	let mask = createMask();
	let dg = <Dialog url={url} param={param} fn={fn} />;
	ReactDOM.render(
			dg,
			mask
		);
	return dg;
};

export {
	dialog
}