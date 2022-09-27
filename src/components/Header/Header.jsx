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

  const imageClickHandler = () =>{
    navigate('/')
  }

  return (
    <header>
      <img className="img-logo-capybara" onClick={imageClickHandler} src={logoCapybara} alt="" />

      <div className="box-header-n">
        <button className="profile-or-login" onClick={loginHandler}>
          <strong>{(profile !== 'anonymous') ? profile : 'Entrar'}</strong>
        </button>
        <button className="sign-up-or-in" onClick={registerAndSignHandler}>
          <strong>
            {profile === undefined ? 'Registrar' : profile === 'anonymous' ? 'Registrar' : 'Sair'}
          </strong>
        </button>
      </div>
    </header>
  );
};

export default Header;
