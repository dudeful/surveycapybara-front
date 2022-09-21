import React from 'react';

function Option (props){
    return (
        <div>
            <button
                key={props.id}
                className={"option"}
                id={props.id}
                onClick={props.function} 
            > {props.name}</button><button className='qntvotes'> <strong>{props.votes}</strong></button>
        </div>
    )
}

export  {Option};