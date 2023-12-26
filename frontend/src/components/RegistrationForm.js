import React, { useState } from 'react'
import '../styles/login.css'
import axios from 'axios'

function RegistrationForm(props) {
    const [login, setLogin] = useState()
    const [password, setPassword] = useState()
    function createUser(login, password) {
        axios.get('http://127.0.0.1:8000/2', { params: { login: login, password: password, request_type: "create_user" } }).then((data) => {
            console.log(data.data);
            if (data.data.success) {
                if (localStorage.getItem('status') === null) {
                    props.controllers.setLogged(true)
                    props.controllers.setToken(data.data.token)
                    props.controllers.setStatus(data.data.status)
                    props.controllers.toMain()
                    props.controllers.setUser(data.data.username)
                }
                else if (localStorage.getItem('status') === 'cashier') {
                    props.controllers.toMain()
                }
            }
            else{
                alert('Пользователь уже есть в системе')
            }
        })
    }
    return (
        <div className='user-form'>
            <div className='title'>{localStorage.getItem('status') === null ? 'Регистрация' : 'Создание пользователя'}</div>
            <div className='input-container'>
                <h1>Email</h1>
                <input type='text' onInput={(event) => setLogin(event.target.value)}></input>
                <h1>Пароль</h1>
                <input type='password' onInput={(event) => setPassword(event.target.value)}></input>
                <button onClick={() => createUser(login, password)}>Создать аккаунт</button>
            </div>
        </div>)
}

export default RegistrationForm