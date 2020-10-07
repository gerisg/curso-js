import React from 'react';
import NavItemIcon from './navitem/NavItemIcon';
import NavItemImage from './navitem/NavItemImage';

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars"></i>
      </button>
      <ul className="navbar-nav ml-auto">
        <NavItemIcon id='alertsDropdown' icon='fas fa-bell fa-fw' value='3+' />
        <NavItemIcon id='messagesDropdown' icon='fas fa-envelope fa-fw' value='7' />
        <div className="topbar-divider d-none d-sm-block"></div>
        <NavItemImage id='userDropdown' image='images/dummy-avatar.jpg' value='Walter White' />
      </ul>
    </nav>
  );
}

export default Navbar;