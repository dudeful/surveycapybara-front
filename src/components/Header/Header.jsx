import React from 'react';
import logoCapybara from "../../img/capybara.svg"
const Header = () => {
  return (
    <header>
     
     <img  className='img-logo-capybara' src={logoCapybara} alt="" />

      <div className='box-header-n'>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;
