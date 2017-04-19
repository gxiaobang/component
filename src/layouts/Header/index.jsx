/**
 * 主页头部
 */
import React from 'react';
import './style';

class Header extends React.Component {

  handleLogout() {
    window.location.href = '/login';
  }

	render() {
		return (
      <div className="header">
        <div className="header-logo">
          {__('web组件')}
        </div>

        <a href="javascript:;" onClick={this.handleLogout.bind(this)} className="header-user-info">
          {__('注销')}
        </a>
      </div>
		);
	}
}

export default Header;