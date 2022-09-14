import React from 'react';
import Message from './Message.jsx';
import Sender from './Sender.jsx';

function Chat(props) {
  return (
    <div id="chat" className="chat-imporvise">
      <div id="all_messages">
        {props.messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>

      <Sender />
    </div>
  );
}

export default Chat;
