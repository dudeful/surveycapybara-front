import React from 'react';

function Option (props){
    return (
        <div>
            <button
                key={props.id}
                className={"option"}
                id={props.id}
                onClick={props.function} 
            > {props.name}</button>
            <button
                className='option-votes'
            >{props.votes}</button>
        </div>
    )
}

export default Option