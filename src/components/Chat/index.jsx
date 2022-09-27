import React from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import Message from './Message.jsx';
import Sender from './Sender.jsx';

function Chat(props) {
  const scrollToMessage = useRef(null);
  const scrollToLastMessage = () => {
    scrollToMessage.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [props.messages]);
  return (
    <div id="chat" className="chat">
      <div id="messageContainer" className="messageContainer">
        {props.messages.map((data) => {
          return <Message key={data.message.id} message={data.message} />;
        })}
        <div ref={scrollToMessage}></div>
      </div>

      <Sender />
    </div>
  );
}

export default Chat;
