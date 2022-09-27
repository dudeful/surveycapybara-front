import React from 'react';

function Message(props) {
  const { message } = props;

  return (
    <div className="messeges">
      <p>
        <span className="user"><strong>{message.user.username}:</strong></span> {message.body}
      </p>
    </div>
  );
}

export default Message;
