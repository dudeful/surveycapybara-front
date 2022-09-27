//import React, { useState, useEffect, useContext } from 'react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import { Navigation } from './Navigation';
//import { UserContext } from '../Context/UserContext';
import { API_URL } from '../Env';
import './styles.css';

function SideBar(props) {
  const navigation = useNavigate();
  const [itens, setItens] = useState([]);
  //const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    async function fetchItens() {
      try {
        const publicPools = await fetch(`${API_URL}/pools/public`)
          .then((response) => response.json())
          .then((data) => data.pools);
        setItens((s) => [...publicPools]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchItens();
  }, []);

  /*useEffect(() => {
    async function fetchItens() {
      try {
        if (user.email === null) {
          return;
        }
        const url = `${API_URL}/pools/private${user.email ? '?email=' + user.email : ''}`;
        const myPools = await fetch(url)
          .then((response) => response.json())
          .then((data) => data.pools);

        if (Array.isArray(myPools)) {
          setItens((s) => [...s, ...myPools]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchItens();
  }, []);*/

  const funcbutton = (props) => {
    navigation(`/pool/${props}`, { state: { id: props } });
    // window.location.reload();
  };
  const ButtonNavigation = (props) => {
    return (
      <button
        onClick={() => {
          funcbutton(props.href);
        }}
        className="navigation"
      >
        {props.name}
      </button>
    );
  };
  //{props.owner === 'anonymous'?
  return (
    <div className="side-bar">
      {itens.map((item, i) => {
        return <ButtonNavigation href={item.id} name={item.name} key={i} />;
      })}

      <Link className="navigation-create" to="/create-pool">
        +
      </Link>
    </div>
  );
}

export default SideBar;
