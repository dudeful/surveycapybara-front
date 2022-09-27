/* eslint-disable */
import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import Header from '../Header/Header';
import IconProfile from '../../img/icon_profile.png';
import IconProfilePlus from '../../img/icon_profile_plus.png';
import IconEmail from '../../img/icon_email.png';
import IconPassword from '../../img/icon_password.png';
import IconLogin from '../../img/icon_login.png';
import { API_URL } from '../Env';
import './styles.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);
  const [labelemail, setEmailLabel] = useState('');
  const [labelpass, setPassLabel] = useState('');

  const { pool_id } = useParams();
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = async () => {
    const user = { email, password };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
      credentials: 'include',
    };

    const response = await fetch(`${API_URL}/users/login`, options);
    const data = await response.json();

    setEmailLabel('');
    setPassLabel('');

    switch (data.error) {
      case 'the email provided is not valid!':
        setEmailLabel('Não foi encontrado esse email');
        break;

      case 'No user with this email has been found':
        setEmailLabel('Não foi encontrado esse email');
        break;

      case 'wrong password':
        setPassLabel('A senha está incorreta');
        break;

      default:
    }

    if (data.isAuthenticated) {
      setUser(data.user);
      navigate(`/`);
    }
  };

  const handleStatus = (e) => {
    setStatus(true);
    navigate(`/register`);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Header />
      <form id="login" className="box-form-login">
        <fieldset className="box-fieldset-login">
          <legend className="box-login-modal">
            <div className="box-modal-login">
              <img src={IconProfile} alt="" />
              <input className="input-btn-login" type="button" value="ENTRAR" />
            </div>

            <div className="box-modal-register" value={status} onClick={handleStatus}>
              <img src={IconProfilePlus} alt="" />
              <input className="input-btn-register" type="button" value="REGISTRAR" />
            </div>
          </legend>
          <div className="input-box-email">
            <img src={IconEmail} alt="" />
            <input
              className="input-email"
              placeholder="Seu email"
              type="email"
              id="login_email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <p className="text-[11px]">
            {labelemail !== '' ? (
              <label className="error" htmlFor={'login_email'}>
                {labelemail}
              </label>
            ) : (
              <></>
            )}
          </p>
          <div className="input-box-password">
            <img src={IconPassword} alt="" />
            <input
              className="input-password"
              placeholder="Sua Senha"
              type="password"
              id="login_password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <p className="text-[11px]">
            {labelpass !== '' ? (
              <label className="error" htmlFor={'login_password'}>
                {labelpass}
              </label>
            ) : (
              <></>
            )}
          </p>

          <button type="button" className="btn-login" id="login_button" onClick={loginHandler}>
            <h3>LOGIN</h3>
            <img src={IconLogin} alt="" />
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default Login;
