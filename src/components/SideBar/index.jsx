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
        const response = await fetch(`${API_URL}/pools/public`);
        const data = await response.json();

        setItens(() => [...data.pools]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchItens();
  }, []);

  const ButtonNavigation = (props) => {
    return (
      <button
        onClick={() => {
          navigation(`/pool/${props.href}`, { state: { id: props.href } });
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
