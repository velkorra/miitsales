import React, { useState } from 'react'
import '../styles/login.css'
import axios from 'axios'

function Refund(props) {
    const [card, setCard] = useState()
    const [password, setPassword] = useState()
    const [state, setState] = useState('initial')
    function userLogin(login, password){
        axios.get('http://127.0.0.1:8000/2', {params: {login:localStorage.getItem('username'), id:props.id, card:card, password:password, request_type:"refund"}}).then((data)=>{
            console.log(data)
            if (data.data.success){
                setState('refund')
            }
        else{
            alert('Неверный номер или код карты')
        }})
    }
    return state==='initial'? (
        <div className='user-form'>
            <div className='title'>Возврат билета</div>
            <div className='input-container'>
                <h1>Номер карты для возврата</h1>
                <input type='text' onInput={(event)=>setCard(event.target.value)}></input>
                <h1>Super CVV код</h1>
                <input type='password' onInput={(event)=>setPassword(event.target.value)}></input>
                <button onClick={()=>userLogin(card, password)}>Оформить возврат</button>
            </div>
        </div>):
        (
            
            <div className='user-form'>
                <div className='title'>Возврат прошла успешно!</div>
                <button className='bbutton' onClick={props.toUserPage}> На главную</button>
            </div>
        )
}

export default Refund