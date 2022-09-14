/* eslint-disable */
import React, { useContext } from 'react';
import { SocketContext } from '../Context/SocketContext';
import { UserContext } from '../Context/UserContext';
import "./style.css"

function Sender(props) {
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);

  const message_text = document.getElementById('message_text');

  const sendMessage = () => {
    try {
      const data = {
        user,
        code: 2,
        message: message_text.value,
      };

      if (message_text.value) {
        socket.send(JSON.stringify(data));
      }
    } catch (error) {
      console.error('<<<ERROR WHILE SENDING MESSAGE>>>');
      console.error(error);
    }
  };

  return (
    <div id="chat_container">
      <h3>{user.username}</h3>

      <textarea name="message_text" id="message_text" rows="10"></textarea>

      <button id="sender_button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default Sender;
