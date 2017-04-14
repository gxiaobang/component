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
			<div className="banner">
        <div className="banner-header">
          <div className="banner-logo">
            {__('web组件')}
          </div>

          <a href="javascript:;" onClick={this.handleLogout.bind(this)} className="banner-user-info">
            注销
          </a>
        </div>
      </div>
		);
	}
}

export default Header;