import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import './styles/main.css'
import Ticket from "./components/Ticket";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";

const App = () => {
    const [pageState, setPageState] = useState('main')
    const toLoginPage = () => setPageState('login')
    const toMainPage = () => setPageState('main')
    if (pageState === 'login') {
        return (
            <LoginPage toMain={toMainPage}></LoginPage>
        )
    }

    else if (pageState === 'main') {
        return (
            <div>
                <Header toLogin={toLoginPage}></Header>
                <MainPage></MainPage>
            </div>
        )
    }
    else return (<div>pageError</div>)
}
export default App