import React, { useState } from 'react';

function CreatePool(props){
    const inputArr = [{
        value: "",
        id: "option-0",
        key: 0
    },
    {
        value: "",
        id: "option-2",
        key: 1
    }
    ]

    const [arr, setArr] = useState(inputArr);


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    };
    const handleButton = (event) => {
        event.preventDefault();
        setArr(s => [...s,{value: ""}]);
    }
    const handleNumber = (event) => {
        event.preventDefault();
        if (event.target.value < 1){
            event.target.value = 1;
        }else if (event.target.value > arr.length-1) {
            event.target.value = arr.length-1;
        }
    }
    return (
    <div className="create-pool">
        <h3 className='asap'>Crie Sua Pesquisa</h3>
        <form id="create-pool box-modal" onSubmit={handleSubmit} >
            <div className='input-form-box'>
                <input type="text" className={"input-form"} placeholder="Titulo da Pesquisa" />
            </div>
            <div className='input-form-box input-form-box-label'>
                <label className='label-input' htmlFor="numVotes">
                    N° de votos:
                </label>
                <input name="numVotes" type="number" className={"input-form input-form-small"} onChange={handleNumber} defaultValue={1} />
            </div>
            {arr.map((item, i) => {
                return (
                    <div className='input-form-box'>
                        <input
                            defaultValue={item.value}
                            id={"option-"+i}
                            type={"text"}
                            key={i}
                            className={"input-form"}
                            placeholder={"Preencher opção"}
                        />
                    </div>
                    );
            })}
            <div className='divButtons'>
                <button className="bnt-forms asap" onClick={handleButton}>Adicionar Opção</button>
                <input className="bnt-forms asap" type="submit" value={"Criar"} />
            </div>
        </form>
    </div>
    );
}

export default CreatePool;
