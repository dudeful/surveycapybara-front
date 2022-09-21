import React from 'react';
import Header from '../Header/Header';
import SideBar from '../SideBar';
import "./styles.css"

const EnterCode = () => {
    const buttonHandler = (event)=>{

    }
    return (
        <>
            <Header> </Header>
            <div className='page'>
                <SideBar itens={[{name:"teste", code:"ea78cc88"}]} />
                <form className='box-form-code centrilize'>
                    <h2> Surveycabybara</h2>
                    <fieldset className='box-fieldset-code'>
                        <input className='input-code-enter' type="text" placeholder='Enter code' />
                        <input className='input-code-password' type="password" placeholder='Enter password' />
                        <input className='input-code-btn' type="button" value="Enter" onClick={buttonHandler} />
                    </fieldset>
                </form>
            </div>

        </>
    )
}

export default EnterCode