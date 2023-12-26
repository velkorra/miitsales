import React, { useState } from 'react'
import '../styles/login.css'
import axios from 'axios'

function Payment(props) {
    const [card, setCard] = useState()
    const [password, setPassword] = useState()
    const [state, setState] = useState('initial')
    function userPay(login) {
        axios.get('http://127.0.0.1:8000/2', { params: { login: login, id: props.id, request_type: "cashpay" } }).then((data) => {
            console.log(data)
            if (data.data.success === true) {
                setState('payment')
                localStorage.setItem('money', (parseInt(localStorage.getItem('money')) + props.price).toString())
            }
            else if (data.data.success === 'already bought') {
                alert('Нельзя купить больше одного билета на один рейс')
            }
            else {
                alert('Неверный Email пользователя')
            }
        })
    }
    function userLogin(login, password) {
        axios.get('http://127.0.0.1:8000/2', { params: { login: localStorage.getItem('username'), id: props.id, card: card, password: password, request_type: "payment" } }).then((data) => {
            console.log(data)
            if (data.data.success === true) {
                setState('payment')
            }
            else if (data.data.success === 'already bought') {
                alert('Нельзя купить больше одного билета на один рейс')
            }
            else {
                alert('Неверный номер или код карты')
            }
        })
    }
    return state === 'initial' ?
        localStorage.getItem('status') === 'cashier' ?
            (
                <div className='user-form'>
                    <div className='title'>Оформление билета на пользователя</div>
                    <div className='input-container'>
                        <h1>Email пользователя</h1>
                        <input type='text' onInput={(event) => setCard(event.target.value)}></input>
                        {console.log(card)}
                        <button onClick={() => userPay(card)}>Оформить билет</button>
                    </div>
                </div>)
            :
            (
                <div className='user-form'>
                    <div className='title'>Онлайн оплата</div>
                    <div className='input-container'>
                        <h1>Номер карты</h1>
                        <input type='text' onInput={(event) => setCard(event.target.value)}></input>
                        <h1>Super CVV код</h1>
                        <input type='password' onInput={(event) => setPassword(event.target.value)}></input>
                        <button onClick={() => userLogin(card, password)}>Оплатить {props.price}</button>
                    </div>
                </div>) :
        (

            <div className='user-form'>
                <div className='title'>Оплата прошла успешно!</div>
                <button className='bbutton' onClick={props.toMain}> На главную</button>
            </div>
        )
}

export default Payment