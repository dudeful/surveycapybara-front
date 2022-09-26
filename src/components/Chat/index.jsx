import React from 'react';
import Message from './Message.jsx';
import Sender from './Sender.jsx';




function Chat(props) {
  console.log("props: ",props.message)
  return (
    <div className="chat">
      <div className="messageContainer">
        {props.messages.map((message) => {
          return <Message key={message.id} message={message.message} />;
        })}
      </div>

      <Sender />
    </div>
  );
}

export default Chat;
