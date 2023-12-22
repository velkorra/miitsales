import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import '../styles/main.css'
import Ticket from "./Ticket";

function Header(props) {
    const logged = props.logged
    return (
        <div className="header">
            <div className="header-content">
                <div className="logo">MiitSales</div>
                <div className="logreg">
                    {logged===false?
                    (<div className="logreg"><div className="login" onClick={props.toLogin}>Вход</div>
                    <div className="border"></div>
                    <div onClick={props.toReg}>регистрация</div>
                        </div>):
                        (<div className="login" onClick={()=>{props.setLogged(false);localStorage.removeItem('status');localStorage.removeItem('token')}}>Выйти из аккаунта</div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Header