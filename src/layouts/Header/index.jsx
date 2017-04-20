/**
 * 主页头部
 */
import React from 'react';
import { Link } from 'components';
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

        <Link href="/login" className="header-user-info">{__('注销')}</Link>
      </div>
		);
	}
}

export default Header;