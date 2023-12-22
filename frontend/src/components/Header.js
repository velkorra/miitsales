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
                {localStorage.getItem('username')!==null? <div className="user">Вы вошли как {localStorage.getItem('username')}</div>:''}
                <div>
                    {logged === false ?
                        (<div className="logreg"><div className="login" onClick={props.toLogin}>Вход</div>
                            <div className="border"></div>
                            <div onClick={props.toReg}>регистрация</div>
                        </div>) :
                        localStorage.getItem('status') === 'client' ?
                            (<div className="logreg"><div className="login" onClick={() => {
                                props.setLogged(false); localStorage.removeItem('status'); localStorage.removeItem('username'); localStorage.removeItem('token');
                            }}>Выйти из аккаунта</div></div>) :
                            (<div className="logreg"><div className="login" ><a target="_self" href="http://127.0.0.1:8000/admin/app/flight/">Управлять списком рейсов</a></div>
                                <div className="border"></div>
                                <div className="login" onClick={() => {
                                props.setLogged(false); localStorage.removeItem('status'); localStorage.removeItem('token'); localStorage.removeItem('username')
                            }}>Выйти из аккаунта</div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Header