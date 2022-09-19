import React from 'react'

const EnterCode = () => {
    return (
        <>
            <form className='box-form-code'>
                <h2> Surveycabybara</h2>
                <fieldset className='box-fieldset-code'>
                    <input className='input-code-enter' type="text" placeholder='Enter code' />
                    <input className='input-code-password' type="password" placeholder='Enter password' />
                    <input className='input-code-btn' type="button" value="Enter" />
                </fieldset>
            </form>

        </>
    )
}

export default EnterCode