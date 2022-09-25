import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Navigation(props) {
  return (
    <>
      <Link className="navigation" to={'/pool/' + props.href}>
        {props.name}
      </Link>
    </>
  );
}

export { Navigation };
