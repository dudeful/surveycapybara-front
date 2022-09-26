import React from 'react';
import logoCapybara from "../../img/capybara.svg"
const Header = (props) => {
  const profile = props.profile
  return (
    <header >
     <img  className='img-logo-capybara' src={logoCapybara} alt="" />

      <div className='box-header-n'>
        <h4 className='profile-or-login'>{profile ? profile : "login"}</h4>
        <h4 className='sign-up-or-in'>{profile === "anonymous" ? "sign-up" : "sign-in"}</h4>
      </div>
    </header>
  );
};

export default Header;
