import React from 'react';
import {Navigation} from './Navigation'
import "./styles.css";

function SideBar (props){
    console.log(props.itens);
    try {
        fetch("https://server-surveycapybara.dudeful.com/pools/all").then((response) => console.log(response.json())).then((data) => console.log(data));
    } catch (error) {
        console.log(error);
    }
    return (
        <div className='side-bar'>
            {props.itens.map((item, i) => {
                return (<Navigation
                href={item.code}
                name={item.name}/>)
            })}
            <a className='navigation-create' href='/create-pool'>+</a>
        </div>
    );
}

export default SideBar;