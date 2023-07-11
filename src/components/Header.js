import React from 'react';
import logo from '../images/icon/logo_wight.svg';

function Header(props) {
  return (
    <header className="header">
      <img
        className="logo header__logo"
        src={logo}
        alt="лого сайта"
        draggable="false"
      />
    </header>
  );
}

export default Header;