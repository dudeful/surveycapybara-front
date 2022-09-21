import React from 'react';
import {Navigation} from './Navigation'
import "./styles.css";

function SideBar (props){
    console.log(props.itens)
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