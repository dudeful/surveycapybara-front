/* eslint-disable */
import './styles.css';
import React, { useContext, useState, Component } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { SocketContext } from '../Context/SocketContext';
import { UserContext } from '../Context/UserContext';
import { Option } from './Option';

function Voting(props) {
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);
  const [count, setCount] = useState(0);

  console.log("Voting props.options")
  console.log(props.options)

  const castVote = (e) => {
    try {
      if (count < props.pool.posite_votes) {
        setCount(count + 1);
        const data = {
          user,
          code: 1,
          vote: e.target.id,
        };

        console.log("Voting castVote socket.send data")
        console.log(data)
        socket.send(JSON.stringify(data));
        e.currentTarget.disabled = true;
      }
    } catch (error) {
      console.error('<<<ERROR WHILE CASTING VOTE>>>');
      console.error(error);
    }
  };

  console.log(props.pool);

  const votesAvailable = (avability) => {
    if (avability > 1) {
      return (
        <p>
          Você tem <span>{avability}</span> disponíveis
        </p>
      );
    } else {
      return (
        <p>
          Você tem <span>{avability}</span> disponível
        </p>
      );
    }
  };

  const display = (status) => {
    console.log(props.options);
    if (!status) {
      return props.options.map((option) => {
        return (
          <Option
            key={option.id}
            name={option.id}
            id={option.id}
            function={castVote}
            votes={option.votes}
            visibility={props.pool.visible}
          />
        );
      });
    } else {
      return (
        <BarChart width={730} height={250} data={props.options}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="votes" fill="#5B28BF" />
        </BarChart>
      );
    }
  };

  if (!props.options) return <div className="voting">loading...</div>;

  return (
    <>
      <div className="voting">
        <h2>{props.pool.title}</h2>
        <p>{props.pool.description}</p>
        {display(props.pool.posite_votes === count)}
        <div className="votes-display">
          <div>{votesAvailable(props.pool.posite_votes - count)}</div>
          <div>
            <label className="label-votes" htmlFor="allVotes">
              N° total de votos:
            </label>
            <input
              id="allVotes"
              className="total-votes"
              value={props.options.total_votes}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Voting;
