import React from 'react';

function Option (props){
    return (
        <div  className='input-form-box'>
            <input
               defaultValue={props.value}
               id={"option-"+props.i}
               type={"text"}
               className={"input-form"}
               placeholder={"Preencher opção"}
               onChange={props.inputHandler}
            />
            <button>-</button>
        </div>
    )
}

export  {Option};