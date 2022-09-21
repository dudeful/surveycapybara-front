/* eslint-disable */
import './styles.css';
import React, { useContext, useState } from 'react';
import { SocketContext } from '../Context/SocketContext';
import { UserContext } from '../Context/UserContext';
import { Option } from './Option';

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
    <>
      <div className='voting'>
        <h2>Test</h2>
        {props.options.list.map((option) => {
          return (
            <Option
              name={option.id}
              id={option.id}
              function={castVote} 
              votes={option.votes}
              />
          );
        })}
        <div className="votes-display">
          <label className='label-votes' htmlFor="allVotes">
            N° de votos:
          </label>
          <input id='allVotes' className="total-votes" value={props.options.total_votes} disabled={true} />
        </div>
      </div>
    </>
  );
}

export default Voting;
