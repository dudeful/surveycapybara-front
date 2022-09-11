import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

// const API_URL = 'https://server-surveycapybara.dudeful.com';
const API_URL = 'http://localhost:5000';

function Login(props) {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = async () => {
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;
    const user = { email, password };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
    };

    const response = await fetch(`${API_URL}/users/login`, options);
    const data = await response.json();

    if (data.isAuthorized) {
      setUser(data.user);
      navigate('/pool');
    }
  };

  return (
    <div id="login">
      <input placeholder="email" type="email" id="login_email" />
      <input placeholder="password" type="password" id="login_password" />
      <button id="login_button" onClick={loginHandler}>
        login
      </button>
    </div>
  );
}

export default Login;
