import React from 'react';

function Message(props) {
  const { message } = props;

  return (
    <div id="message">
      <h3>{message.user}</h3>
      <p>{message.body}</p>
    </div>
  );
}

export default Message;
