import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import './styles/main.css'
import Ticket from "./components/Ticket";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";

const App = () => {
    const [pageState, setPageState] = useState('main')
    const [logged, setLogged] = useState(localStorage.getItem('token')===null?false:true)
    const setToken = (token) => localStorage.setItem('token',token)
    const setStatus = (status) => localStorage.setItem('status',status)
    const setUser = (status) => localStorage.setItem('username',status)
    const toLoginPage = () => setPageState('login')
    const toMainPage = () => setPageState('main')
    const toRegistrationPage = () => setPageState('registration')
    if (pageState === 'login' || pageState==='registration') {
        return (
            <LoginPage toMain={toMainPage} pageState={pageState} logged={logged} setToken={setToken} setLogged={(value)=>setLogged(value)} setStatus={setStatus} setUser={setUser}></LoginPage>
        )
    }

    else if (pageState === 'main') {
        return (
            <div>
                <Header toLogin={toLoginPage} toReg={toRegistrationPage} logged={logged} setToken={setToken} setLogged={(value)=>setLogged(value)} setStatus={setStatus} setUser={setUser}></Header>
                <MainPage></MainPage>
            </div>
        )
    }
    else return (<div>pageError</div>)
}
export default App