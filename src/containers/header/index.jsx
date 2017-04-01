/**
 * 主页头部
 */
import React from 'react';
import './style/index';

class Header extends React.Component {

	render() {
		return (
			<div className="header">{__('web组件')}</div>
		);
	}
}

export default Header;