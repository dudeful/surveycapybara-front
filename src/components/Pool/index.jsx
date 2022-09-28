/* eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { SocketContext } from '../Context/SocketContext';
import { UserContext } from '../Context/UserContext';
import Voting from '../Voting';
import Chat from '../Chat';
import SideBar from '../SideBar';
import Header from '../Header/Header';
import { API_URL } from '../Env';
import './styles.css';

function Pool(props) {
  window.onbeforeunload = function () {
    return 'Você está prestes a deslogar!';
  };

  const { pool_id } = useParams();
  const socket = useContext(SocketContext);
  const [pool, setPool] = useState();
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [poolAuth, setPoolAuth] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setPoolAuth(location.state);

    const fetchPool = async () => {
      try {
        const wsToken = localStorage.getItem('ws-token');
        console.log(wsToken);

        const response = await fetch(
          `${API_URL}/pools?id=${pool_id}&wsToken=${wsToken}&password=${
            location.state?.password || ''
          }`,
          {
            credentials: 'include',
          }
        );
        const data = await response.json();
        setPool(data.pool);
        // localStorage.setItem('ws-token', data.token.ws_token);

        if (options[0]) {
          try {
            const data = {
              user,
              pool_id,
              code: 3,
              status: 'changing pools',
            };

            socket.send(JSON.stringify(data));
          } catch (error) {
            console.error('<<<ERROR WHILE CHANGING POOLS>>>');
            console.error(error);
          }
        }

        // setOptions(data.options);
        // setMessages(data.messages || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPool();
  }, [pool_id]);

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      try {
        switch (data.code) {
          case 1:
            setOptions(data.options);
            break;
          case 2:
            const newMessage = {
              id: messages.length + 1,
              user: { username: data.user.username, email: data.user.email },
              body: data.body,
            };
            setMessages((prevMessages) => [...prevMessages, { message: newMessage }]);
            break;
          case 3:
            setOptions(data.options);
            setMessages(data.messages || []);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('<<<ERROR WHILE READING VOTES/MESSAGES>>>');
        console.error(error);
      }
    };
  }, [socket.onmessage]);

  if (pool === undefined) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className="main-page">
        <SideBar />
        <Header profile={user.username} />

        <Voting pool={pool} options={options} />
        <Chat messages={messages} />
      </div>
    </>
  );
}

export default Pool;
