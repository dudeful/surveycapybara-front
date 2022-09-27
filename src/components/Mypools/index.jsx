/* eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { SocketContext } from '../Context/SocketContext';
import { UserContext } from '../Context/UserContext';
import Voting from '../Voting';
import Chat from '../Chat';
import SideBar from '../SideBar';
import Header from '../Header/Header';
import { API_URL, WS_URL } from '../Env';
import './styles.css';

function Mypools(props) {
  // ea78cc88
  // 5b770395
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
        const response = await fetch(
          `${API_URL}/pools?id=${pool_id}&password=${location.state?.password || ''}`,
          {
            credentials: 'include',
          }
        );
        const data = await response.json();
        setPool(data.pool);
      } catch (error) {
        console.error(error);
      }
    };

    //this function is to verify if the token is still valid, if it isn't then we redirect the user back to login screen
    /* const isTokenFresh = async () => {
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
    }; */

    //isTokenFresh();
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
            //console.log(messages);
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
  }, [location.state.id]);

  const renderingPage = (owner) => {
    if (pool === undefined) {
      return <div>loading...</div>;
    }

    const poolData = {
      pool_ownership: pool.owner === owner,
      title: pool.name,
      posite_votes: pool.positive_votes_per_voter,
      description: pool.description,
      visible: pool.visible_vote,
    };
    return (
      <>
        <Voting pool={poolData} options={options} />
        <Chat messages={messages} />
      </>
    );
  };

  return (
    <>
      <div className="main-page">
        <SideBar />
        <Header profile={user.username} />
        {renderingPage(user.email)}
      </div>
    </>
  );
}

export default Mypools;
