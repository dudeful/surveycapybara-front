import React from 'react';

function Option(props) {
  //console.log(props);
  if (props.visibility) {
    return (
      <div>
        <button key={props.id} className={'option'} id={props.id} onClick={props.function}>
          {' '}
          <strong>{props.name}</strong>
        </button>
        <button className="qntvotes">
          {' '}
          <strong>{props.votes}</strong>
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button key={props.id} className={'option-round'} id={props.id} onClick={props.function}>
          {' '}
          <strong>{props.name}</strong>
        </button>
      </div>
    );
  }
}

export { Option };
