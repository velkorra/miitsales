import React from 'react'
import '../styles/login.css'

function LoginPage(props) {
  return (
    <div className='user-form' onClick={props.toMain}></div>
  )
}

export default LoginPage