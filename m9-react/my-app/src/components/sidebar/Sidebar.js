import React from 'react';
import Logo from './Logo';
import Action from './Action';

function Sidebar() {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <Logo />
      <hr className="sidebar-divider my-0" />
      <Action name='Dashboard' icon='fas fa-fw fa-tachometer-alt' active='true' />
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Actions</div>
      <Action name='Pages' icon='fas fa-fw fa-folder' />
      <Action name='Charts' icon='fas fa-fw fa-chart-area' />
      <Action name='Tables' icon='fas fa-fw fa-table' />
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}

export default Sidebar;