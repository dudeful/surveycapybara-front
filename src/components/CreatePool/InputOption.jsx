import React from 'react';

function InputOption (props){
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
            <button className='removeInput' onClick={props.removeHandler}>-</button>
        </div>
    )
}

export default InputOption;