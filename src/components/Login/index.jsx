import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import Header from '../Header/Header';
import IconProfile from '../../img/icon_profile.png'
import IconProfilePlus from '../../img/icon_profile_plus.png'
import IconEmail from '../../img/icon_email.png'
import IconPassword from '../../img/icon_password.png'
import IconLogin from '../../img/icon_login.png'

function Login(props) {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = () => {
    const username = document.getElementById('login_email').value;
    setUser({ name: username });
    navigate('/pool');
  };

  return (
    <>
      <Header>  </Header>
      <form id="login">

        <fieldset>
          <legend className='box-login-modal'>
            <div className='box-modal-login'>
              <img src={IconProfile} alt="" />
              <input className='input-btn-login' type="button" value="LOGIN" />
            </div>

            <div className='box-modal-register'>
              <img src={IconProfilePlus} alt="" />
              <input className='input-btn-register' type="button" value="REGISTER" />
            </div>
          </legend>
          <div className='input-box-email'>
            <img src={IconEmail} alt="" />
            <input className='input-email' placeholder="Your  email" type="email" id="login_email" />
          </div>
          <div className='input-box-password'>
            <img src={IconPassword} alt="" />
            <input className='input-password' placeholder="Your password" type="password" id="login_password" />
          </div>
          <div ><a href="http://#" target="_blank" rel="noopener noreferrer">Forgot Password?</a></div>

          <button className='btn-login' id="login_button" onClick={loginHandler}>
            <h2>LOGIN</h2>
            <img src={IconLogin} alt="" />
          </button>

        </fieldset>
      </form>
      {/* <div id="login">

        <input placeholder="email" type="email" id="login_email" />
        <input placeholder="password" type="password" id="login_password" />
        <button id="login_button" onClick={loginHandler}>
          login
        </button>
      </div> */}
    </>
  );
}

export default Login;
