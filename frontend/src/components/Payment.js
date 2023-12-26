import React, { useState } from 'react'
import '../styles/login.css'
import axios from 'axios'

function Payment(props) {
    const [card, setCard] = useState()
    const [password, setPassword] = useState()
    const [state, setState] = useState('initial')
    function userLogin(login, password){
        axios.get('http://127.0.0.1:8000/2', {params: {login:localStorage.getItem('username'), id:props.id, card:card, password:password, request_type:"payment"}}).then((data)=>{
            console.log(data)
            if (data.data.success){
                setState('payment')
            }
        else{
            alert('Неверный номер или код карты')
        }})
    }
    return state==='initial'? (
        <div className='user-form'>
            <div className='title'>Онлайн оплата</div>
            <div className='input-container'>
                <h1>Номер карты</h1>
                <input type='text' onInput={(event)=>setCard(event.target.value)}></input>
                <h1>Super CVV код</h1>
                <input type='password' onInput={(event)=>setPassword(event.target.value)}></input>
                <button onClick={()=>userLogin(card, password)}>Оплатить {props.price}</button>
            </div>
        </div>):
        (
            
            <div className='user-form'>
                <div className='title'>Оплата прошла успешно!</div>
                <button className='bbutton' onClick={props.toMain}> На главную</button>
            </div>
        )
}

export default Payment