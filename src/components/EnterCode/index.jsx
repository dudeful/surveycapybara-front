import React from 'react';
import Header from '../Header/Header';
import SideBar from '../SideBar';
import { useNavigate } from 'react-router-dom';
import "./styles.css"

const EnterCode = () => {
    const navigate = useNavigate();
    const buttonHandler = (event)=>{
        event.preventDefault();
        const pool = {
            id: document.getElementById("codeField").value,
            password: document.getElementById("password").value
        }

        if (pool.id === ""){
            console.log("vazio");
            return;
        }

        const url = '/pool/' + pool.id + ((pool.password !== "") ? '?' + pool.password : "");

        try {
            //fetch(url).then((response) => console.log(response.json())).then((data) => console.log(data));
            navigate(url);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Header> </Header>
            <div className='page'>
                <SideBar itens={[{name:"teste", code:"ea78cc88"}]} />
                <form className='box-form-code centrilize'>
                    <h2> Surveycabybara</h2>
                    <fieldset className='box-fieldset-code'>
                        <input id='codeField' className='input-code-enter' type="text" placeholder='Enter code' />
                        <input id='password' className='input-code-password' type="password" placeholder='Enter password' />
                        <input className='input-code-btn' type="button" value="Enter" onClick={buttonHandler} />
                    </fieldset>
                </form>
            </div>

        </>
    )
}

export default EnterCode