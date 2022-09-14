import React from 'react';

function Message(props) {
  const { message } = props;
  return (
    <div id="message" className='messeges'>
      <h3>{message.user.username}</h3>
      <p>{message.body}</p>
    </div>
  );
}

export default Message;
