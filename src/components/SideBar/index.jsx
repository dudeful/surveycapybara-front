import React from 'react';
import {Navigation} from './Navigation'

function SideBar (props){
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