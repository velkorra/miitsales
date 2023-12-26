import React from 'react'
import '../styles/login.css'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import Payment from './Payment'

function LoginPage(props) {

  return (
    <div>
    <div className='logo' onClick={props.toMain} >MiitSales</div>
        {props.pageState==="login"?
        <LoginForm controllers={props}></LoginForm>:
        <RegistrationForm controllers={props}></RegistrationForm>}
    </div>
  )
}

export default LoginPage