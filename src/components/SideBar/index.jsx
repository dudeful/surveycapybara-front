import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../Env';
import './styles.css';

function SideBar(props) {
  const navigation = useNavigate();
  const [itens, setItens] = useState([]);

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

  const funcbutton = (props) => {
    navigation(`/pool/${props}`, { state: { id: props } });
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
