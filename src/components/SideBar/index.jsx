import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import { Navigation } from './Navigation';
import { UserContext } from '../Context/UserContext';
import './styles.css';

function SideBar(props) {
  const navigation = useNavigate();
  const [itens, setItens] = useState([]);
  const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    async function fetchItens() {
      try {
        const publicPools = await fetch('https://server-surveycapybara.dudeful.com/pools/public')
          //const publicPools = await fetch('http://localhost:5000/pools/public')
          .then((response) => response.json())
          .then((data) => data.pools);
        setItens((s) => [...publicPools]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItens();
  }, []);

  /*useEffect(() => {
    async function fetchItens() {
      try {
        const url = 'https://server-surveycapybara.dudeful.com/pools/private' + (user.email !== '' ? '?user=' + user.email : '');
        const myPools = await fetch(url)
          .then((response) => response.json())
          .then((data) => data.pools);
        setItens((s) => [s, ...myPools]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItens();
  }, itens);
*/
  const funcbutton = (props) => {
    navigation(`/pool/${props.href}`);
    window.location.reload();
  };

  const ButtonNavigation = (props) => {
    return (
      <button
        onClick={() => {
          funcbutton(props);
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
        return <ButtonNavigation href={item.id} name={item.name} key={item.id} />;
      })}
      <Link className="navigation-create" to="/create-pool">
        +
      </Link>
    </div>
  );
}

export default SideBar;




