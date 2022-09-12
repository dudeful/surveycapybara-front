/* eslint-disable */
import React, { createContext, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext';

const WS_URL = 'wss://ws-server-surveycapybara.dudeful.com';

const SocketContext = createContext({});

const SocketContextProvider = ({ children }) => {
  const { pool_id } = useParams();
  const [socket, setSocket] = useState(new WebSocket(WS_URL, [pool_id]));
  const [user, setUser] = useContext(UserContext);

  socket.onopen = () => {
    try {
      const data = {
        user,
        code: 3,
        status: 'connection open',
      };

      console.log('WebSocket Connected');
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
        console.log('WebSocket Reconnected');
      }, 3000);
    } catch (error) {
      console.error('<<<<ERROR WHILE TRYING TO RECOPEN SOCKET CONNECTION>>>>');
      console.error(error);
    }
  };

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketContextProvider };
