import React from 'react';

function Option(props) {
  console.log(props);
  if (props.visibility) {
    return (
      <div>
        <button key={props.id} className={'option'} id={props.id} onClick={props.function}>
          {' '}
          {props.name}
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
          {props.name}
        </button>
      </div>
    );
  }
}

export { Option };
