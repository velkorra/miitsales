import React from 'react'
import '../styles/login.css'

function LoginForm() {
    return (
        <div className='user-form'>
            <div className='title'>Вход в аккаунт</div>
            <div className='input-container'>
                <h1>Email или логин</h1>
                <input type='text'></input>
                <h1>Пароль</h1>
                <input type='password'></input>
                <button>Войти</button>
            </div>
        </div>
    )
}

export default LoginForm