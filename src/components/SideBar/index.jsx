import React, { useState, useEffect, useContext } from 'react';
import {Navigation} from './Navigation'
import { UserContext } from '../Context/UserContext';
import "./styles.css";

function SideBar (props){
    const [itens, setItens] = useState([]);
    const [user, setUser] = useContext(UserContext);
    useEffect (()=>{
        async function fetchItens(){
            try {
                const publicPools = await fetch("https://server-surveycapybara.dudeful.com/pools/public")
                .then((response) => response.json())
                .then((data) => data.pools);
                setItens(s => [...publicPools]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchItens();
    },itens);

    /*useEffect (()=>{
        async function fetchItens(){
            try {
                const url = "https://server-surveycapybara.dudeful.com/pools/my-pools?user="+user.email;
                const myPools = await fetch(url)
                .then((response) => response.json())
                .then((data) => data.pools);
                setItens(s => [...s , ...myPools]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchItens();
    },itens);*/

    return (
        <div className='side-bar'>
            {itens.map((item, i) => {
                return (<Navigation
                href={item.id}
                name={item.name}/>)
            })}
            <a className='navigation-create' href='/create-pool'>+</a>
        </div>
    );
}

export default SideBar;