import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import Header from '../Header/Header';
import IconProfile from '../../img/icon_profile.png';
import IconProfilePlus from '../../img/icon_profile_plus.png';
import IconEmail from '../../img/icon_email.png';
import IconPassword from '../../img/icon_password.png';
import { API_URL } from '../Env';

import './style.css';

const Register = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);

  const registerHandler = async () => {
    // const email = document.getElementById('register_email').value;
    // const password = document.getElementById('register_password').value;

    const user = { email, password, username };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
      credentials: 'include',
    };

    const response = await fetch(`${API_URL}/users/register`, options);
    const data = await response.json();

    if (data.isAuthenticated) {
      setUser(data.user);
      //navigate(`/pool/${pool_id}`);
      navigate(`/code`);
      //navigate(-1);
    }
  };

  const handleStatus = (e) => {
    setStatus(true);
    navigate(`/login`);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Header profile={user.username} />
      <form id="register" className="box-form-register">
        <fieldset className="box-fieldset-register">
          <legend className="box-modal">
            <div className="box-modal-l-login" value={status} onClick={handleStatus}>
              <img src={IconProfile} alt="" />
              <input className="input-btn-login" type="button" value="ENTRAR" />
            </div>

            <div className="box-modal-r-register">
              <img src={IconProfilePlus} alt="" />
              <input className="input-btn-register" type="button" value="REGISTRAR" />
            </div>
          </legend>
          <div className="input-box-username">
            <img src={IconProfile} alt="" />
            <input
              className="input-username"
              placeholder="Seu nome de Usuário"
              type="text"
              id="register_username"
              value={username}
              onChange={handleUsername}
            />
          </div>
          <div className="input-box-email">
            <img src={IconEmail} alt="" />
            <input
              className="input-email"
              placeholder="Seu email"
              type="email"
              id="register_email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="input-box-password">
            <img src={IconPassword} alt="" />
            <input
              className="input-password"
              placeholder="Sua Senha"
              type="password"
              id="register_password"
              value={password}
              onChange={handlePassword}
            />
          </div>

          <button
            type="button"
            className="btn-register"
            id="register_button"
            onClick={registerHandler}
          >
            <h3>REGISTER</h3>
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Register;
