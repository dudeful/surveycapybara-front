/* eslint-disable */
import './styles.css';
import React, { useContext, useState, Component } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { SocketContext } from '../Context/SocketContext';
import { UserContext } from '../Context/UserContext';
import { useParams } from 'react-router-dom';
import { Option } from './Option';
import { useEffect } from 'react';

function Voting(props) {
  const { pool_id } = useParams();
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);
  const [count, setCount] = useState(0);

  useEffect(()=>{setCount(0)},[pool_id])

  const castVote = (e) => {
    try {
      if (count < props.pool.positive_votes_per_voter) {
        setCount(count + 1);
        const data = {
          user,
          pool_id,
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

  const links = window.location.href;

  const display = (status) => {
    if (!status) {
      return props.options.map((option) => {
        return (
          <Option
            key={option.id}
            name={option.name}
            id={option.id}
            function={castVote}
            votes={option.votes}
            visibility={props.pool.visible_vote}
          />
        );
      });
    } else {
      return (
        <BarChart width={730} height={250} data={props.options}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
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
        <h2>{props.pool.name}</h2>
        <div className="sharedlink">
          <p>Compartilhe o link de sua pesquisa: </p>
          <p className="links" id="linking">
            {' '}
            {links}
          </p>
          <button
            className="copybtn"
            onClick={() => {
              navigator.clipboard.writeText(links);
            }}
          >
            copiar
          </button>
        </div>
        {display(props.pool.positive_votes_per_voter === count)}
        <div className="votes-display">
          <p id="remaining_votes">Votos restantes: {props.pool.positive_votes_per_voter - count}</p>
          <div>
            <label className="label-votes" htmlFor="allVotes">
              N° total de votos:
            </label>
            <input
              id="allVotes"
              className="total-votes"
              value={props.options.reduce((prev, cur) => {
                return prev + cur.votes;
              }, 0)}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Voting;
