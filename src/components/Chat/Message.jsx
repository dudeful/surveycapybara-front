import React from 'react';

function Message(props) {
  const { message } = props;
  return (
    <div className='messeges'>
      <p><span className="user">{message.user.username}:</span> {message.body}</p>
    </div>
  );
}

export default Message;
