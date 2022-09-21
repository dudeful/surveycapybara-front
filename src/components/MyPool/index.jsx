/* eslint-disable */
import './styles.css';
import React, { useContext, useState } from 'react';

function MyPool(props) {

  if (!props.options.list) return <div>loading...</div>;

  return (
    <>
      <div className='voting'>
        <h2>Test</h2>
        {props.options.list.map((option) => {
          return (
                <div>
                    <button
                        key={option.id}
                        className={"option"}
                        id={option.id}
                        disabled={true}
                    > {option.name}</button><button className='qntvotes'> {option.votes}</button>
                </div>
          );
        })}
      </div>
    </>
  );
}

export default MyPool;
