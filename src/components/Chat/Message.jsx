import React from 'react';

function Message(props) {
  const { message } = props;
  console.log(message);
  return (
    <div id="message">
      {/* <h3>{message.user.username}</h3> */}
      <p>{message.body}</p>
    </div>
  );
}

export default Message;
