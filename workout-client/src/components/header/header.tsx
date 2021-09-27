import React, { ReactElement } from 'react';
import logo from '../../assets/healthy-lifestyle.png';

import './header.css';

const TITLE = 'Workouts';

function Header(): ReactElement {
  return (
    <header className='c-header'>
      <img
        alt='alter with a buble heart'
        className='c-header-logo'
        src={logo}
      />
      <span className='c-header__title'>{TITLE}</span>
    </header>
  );
}

export default Header;
