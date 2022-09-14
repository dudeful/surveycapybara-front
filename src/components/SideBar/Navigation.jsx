import React from 'react';

function Navigation (props){
    return (
        <>
            <a className='navigation' href={"/pool/" + props.href}>{props.name}</a>
        </>
    );
}

export {Navigation};