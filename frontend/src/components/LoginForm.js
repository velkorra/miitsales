import React, { useState } from 'react'
import '../styles/login.css'
import axios from 'axios'

function LoginForm(props) {
    const [login, setLogin] = useState()
    const [password, setPassword] = useState()
    function userLogin(login, password){
        axios.get('http://127.0.0.1:8000/2', {params: {login:login, password:password, request_type:"login"}}).then((data)=>{
            if (data.data.success){
                console.log('login');
                console.log(data.data)
                props.controllers.setLogged(true)
                props.controllers.setToken(data.data.token)
                props.controllers.setStatus(data.data.status)
                props.controllers.toMain()
                props.controllers.setUser(data.data.username)
            }
        else{
            alert('Неверный логин или пароль')
        }})
    }
    return (
        <div className='user-form'>
            <div className='title'>Вход в аккаунт</div>
            <div className='input-container'>
                <h1>Email</h1>
                <input type='text' onInput={(event)=>setLogin(event.target.value)}></input>
                <h1>Пароль</h1>
                <input type='password' onInput={(event)=>setPassword(event.target.value)}></input>
                <button onClick={()=>userLogin(login, password)}>Войти</button>
            </div>
        </div>)
}

export default LoginForm