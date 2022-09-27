import React from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import Message from './Message.jsx';
import Sender from './Sender.jsx';

function Chat(props) {
  //console.log("props: ",props.message)
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
        {props.messages.map((message) => {
          return <Message key={message.id} message={message.message} />;
        })}
        <div ref={scrollToMessage}></div>
      </div>

      <Sender />
    </div>
  );
}

export default Chat;
