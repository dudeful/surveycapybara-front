import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoCapybara from '../../img/capybara.svg';

const Header = (props) => {
  const profile = props.profile;
  const navigate = useNavigate();
  const registerAndSignHandler = () => {
    if (profile === undefined) {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  const loginHandler = () => {
    if (profile === undefined) {
      navigate('/login');
    } else {
      return;
    }
  };

  return (
    <header>
      <img className="img-logo-capybara" src={logoCapybara} alt="" />

      <div className="box-header-n">
        <button className="profile-or-login" onClick={loginHandler}>
          <strong>{profile ? profile : 'login'}</strong>
        </button>
        <button className="sign-up-or-in" onClick={registerAndSignHandler}>
          <strong>{profile === undefined ? 'Register' : 'sign-out'}</strong>
        </button>
      </div>
    </header>
  );
};

export default Header;
