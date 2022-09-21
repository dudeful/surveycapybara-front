/* eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SocketContext } from '../Context/SocketContext';
import { UserContext } from '../Context/UserContext';
import Voting from '../Voting';
import Chat from '../Chat';
import SideBar from '../SideBar'
import Header from '../Header/Header';
import MyPool from '../MyPool'
import "./styles.css";

const API_URL = 'https://server-surveycapybara.dudeful.com';
// const LOCALHOST = 'http://localhost:5000';

function Pool(props) {
  // ea78cc88
  // 5b770395
  const { pool_id } = useParams();
  const socket = useContext(SocketContext);
  const [pool, setPool] = useState();
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState({});
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPool = async () => {
      try {
        const response = await fetch(`${API_URL}/pools?id=${pool_id}`, { credentials: 'include' });
        const data = await response.json();

        console.log(data);

        setPool(data);
      } catch (error) {
        console.error(error);
      }
    };

    //this function is to verify if the token is still valid, if it isn't then we redirect the user back to login screen
    const isTokenFresh = async () => {
      try {
        const response = await fetch(`${API_URL}/users/refresh`, { credentials: 'include' });
        const token = await response.json();

        if (!token.isAuthenticated) {
          navigate('/login');
        } else {
          // when refreshing cookies, must reset username and email
          setUser({ username: token.decoded.username, email: token.decoded.email });
          navigate(`/pool/${pool_id}`);
        }
      } catch (error) {
        console.error('<<<ERROR WHILE REFRESHING TOKEN>>>');
        console.error(error);
      }
    };

    isTokenFresh();
    fetchPool();
  }, []);

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
              body: data.message,
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            console.log(messages);
            break;
          case 3:
            setOptions(data.options);
            setMessages(data.message_history);
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

  const renderingPage = (owner) => {
    if (owner){
      return (<MyPool options={options} />);
    }else{
      return (<Voting options={options} />);
    }
  }

  return (
    <>
      <Header> </Header>
      <div className='main-page'>
        <SideBar itens={[{name:"teste", id:"ea78cc88"}]} />
        {renderingPage(false)}
        <Chat messages={messages} />
      </div>
    </>
  );
}

export default Pool;
