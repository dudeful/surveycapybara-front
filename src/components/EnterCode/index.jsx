import React, { useContext } from 'react';
import Header from '../Header/Header';
import SideBar from '../SideBar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
//import { SocketContext } from '../Context/SocketContext';
import { API_URL } from '../Env';
import './styles.css';

const EnterCode = () => {
  const [user, setUser] = useContext(UserContext);

  const navigate = useNavigate();
  const buttonHandler = (event) => {
    event.preventDefault();
    const pool = {
      id: document.getElementById('codeField').value,
      //password: document.getElementById('password').value,
    };

    if (pool.id === '') {
      return;
    }

    //const url = `${API_URL}/pools?id=${pool.id}&password=${pool.password}`;

    const url = `${API_URL}/pools?id=${pool.id}`;

    try {
      fetch(url)
        .then((response) => {
          response.json();
        })
        .then((data) => data);

      navigate(`/pool/${pool.id}`, {
        //state: { id: pool.id, password: pool.password },
        state: { id: pool.id },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Header profile={user.username} />
      <div className="page">
        <SideBar />
        <form className="box-form-code centrilize">
          <fieldset className="box-fieldset-enter-code">
            <h2>Digite um código</h2>
            <input
              id="codeField"
              className="input-code-enter"
              type="text"
              placeholder="000000"
            />
            <input className="input-code-btn" type="button" value="Enter" onClick={buttonHandler} />
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default EnterCode;
