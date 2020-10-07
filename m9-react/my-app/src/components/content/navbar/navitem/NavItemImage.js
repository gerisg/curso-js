import React from 'react';

function NavItemImage(props) {
  return (
    <li className="nav-item dropdown no-arrow">
      <a className="nav-link dropdown-toggle" href="/" id={ props.id }>
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{ props.value }</span>
        <img className="img-profile rounded-circle" src={ props.image } width="60" alt="imagen de perfil" />
      </a>
    </li>
  );
}

export default NavItemImage;