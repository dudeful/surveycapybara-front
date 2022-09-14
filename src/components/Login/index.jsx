/* eslint-disable */
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import Header from '../Header/Header';
import IconProfile from '../../img/icon_profile.png';
import IconProfilePlus from '../../img/icon_profile_plus.png';
import IconEmail from '../../img/icon_email.png';
import IconPassword from '../../img/icon_password.png';
import IconLogin from '../../img/icon_login.png';

const API_URL = 'https://server-surveycapybara.dudeful.com';
// const LOCALHOST = 'http://localhost:5000';

function Login(props) {
  const { pool_id } = useParams();
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = async () => {
    // const email = document.getElementById('login_email').value;
    // const password = document.getElementById('login_password').value;
    const email = 'dudeful@outlook.com';
    const password = 'EdTech123!';
    const user = { email, password };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
      credentials: 'include',
    };

    const response = await fetch(`${API_URL}/users/login`, options);
    const data = await response.json();

    console.log(data);

    if (data.isAuthenticated) {
      setUser(data.user);
      //navigate(`/pool/${pool_id}`);
      navigate(`/pool/${'ea78cc88'}`);
      //navigate(-1);
    }
  };

  return (
    <>
      <Header> </Header>
      <form id="login">
        <fieldset>
          <legend className="box-login-modal">
            <div className="box-modal-login">
              <img src={IconProfile} alt="" />
              <input className="input-btn-login" type="button" value="LOGIN" />
            </div>

            <div className="box-modal-register">
              <img src={IconProfilePlus} alt="" />
              <input className="input-btn-register" type="button" value="REGISTER" />
            </div>
          </legend>
          <div className="input-box-email">
            <img src={IconEmail} alt="" />
            <input
              className="input-email"
              placeholder="Your  email"
              type="email"
              id="login_email"
            />
          </div>
          <div className="input-box-password">
            <img src={IconPassword} alt="" />
            <input
              className="input-password"
              placeholder="Your password"
              type="password"
              id="login_password"
            />
          </div>
          <div>
            <a href="http://#" target="_blank" rel="noopener noreferrer">
              Forgot Password?
            </a>
          </div>

          <button type="button" className="btn-login" id="login_button" onClick={loginHandler}>
            <h3>LOGIN</h3>
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
