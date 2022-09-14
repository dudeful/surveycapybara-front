import React from 'react';

function Navigation (props){
    return (
        <>
            <a className='navigation' href="#">{props.name}</a>
        </>
    );
}

export {Navigation};