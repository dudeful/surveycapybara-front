/* eslint-disable */
import React, { createContext, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import { WS_URL } from '../Env';

const SocketContext = createContext({});

const SocketContextProvider = ({ children }) => {
  const { pool_id } = useParams();
  const [user, setUser] = useContext(UserContext);
  const [socket, setSocket] = useState(new WebSocket(WS_URL, [user.email]));

  socket.onopen = () => {
    try {
      const data = {
        user,
        pool_id,
        code: 3,
        status: 'connection open',
      };

      console.info('WebSocket Connected');
      socket.send(JSON.stringify(data));
    } catch (error) {
      console.error('<<<ERROR WHILE OPENING CONNECTION>>>');
      console.error(error);
    }
  };

  socket.onclose = () => {
    try {
      setTimeout(() => {
        setSocket(new WebSocket(WS_URL));
        console.info('WebSocket Reconnected');
      }, 3000);
    } catch (error) {
      console.error('<<<<ERROR WHILE TRYING TO RECOPEN SOCKET CONNECTION>>>>');
      console.error(error);
    }
  };

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketContextProvider };
