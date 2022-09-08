import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../Context/SocketContext';
import Voting from '../Voting';
import Chat from '../Chat';

const API_URL = 'https://server-surveycapybara.dudeful.com';
const pool_id = '575e448C';

function Pool(props) {
  const socket = useContext(SocketContext);
  const [pool, setPool] = useState();
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchPool = async () => {
      try {
        const response = await fetch(`${API_URL}/pools?id=${pool_id}`);
        const data = await response.json();

        setPool(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPool();
  }, []);

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      try {
        switch (data.code) {
          case 1:
            setOptions(data.options);
            break;
          case 2:
            const newMessage = {
              id: messages.length + 1,
              user: data.user.name,
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

  return (
    <>
      <Voting options={options} />
      <Chat messages={messages} />
    </>
  );
}

export default Pool;
