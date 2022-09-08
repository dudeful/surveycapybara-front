import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

function Login(props) {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = () => {
    const username = document.getElementById('login_email').value;
    setUser({ name: username });
    navigate('/pool');
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
