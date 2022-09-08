import './styles.css';
import React, { useContext, useState } from 'react';
import { SocketContext } from '../Context/SocketContext';
import { UserContext } from '../Context/UserContext';

function Voting(props) {
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);
  const [count, setCount] = useState(0);

  const castVote = (e) => {
    try {
      if (count < 3) {
        setCount(count + 1);

        const data = {
          user,
          code: 1,
          vote: e.target.id,
        };

        socket.send(JSON.stringify(data));
        e.currentTarget.disabled = true;
      }
    } catch (error) {
      console.error('<<<ERROR WHILE CASTING VOTE>>>');
      console.error(error);
    }
  };

  if (!props.options.list) return <div>loading...</div>;

  return (
    <div id="voting">
      {props.options.list.map((option) => {
        return (
          <button
            key={option.id}
            style={{ width: 10 * option.votes + 'px', maxWidth: '100px' }}
            id={option.id}
            onClick={castVote}
          >
            {option.name} | {option.votes}
          </button>
        );
      })}
      <input value={props.options.total_votes} disabled={true} />
    </div>
  );
}

export default Voting;
