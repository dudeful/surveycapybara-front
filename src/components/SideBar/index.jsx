import React, { useState, useEffect } from 'react';
import {Navigation} from './Navigation'
import "./styles.css";

function SideBar (props){
    const [itens, setItens] = useState([]);
    useEffect (()=>{
        async function fetchItens(){
            try {
                const publicPools = await fetch("https://server-surveycapybara.dudeful.com/pools/public")
                .then((response) => response.json())
                .then((data) => data.pools);
                setItens(publicPools);
            } catch (error) {
                console.log(error);
            }
        }
        fetchItens();
    },itens);
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