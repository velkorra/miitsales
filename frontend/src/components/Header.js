import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import '../styles/main.css'
import Ticket from "./Ticket";

function Header(props) {
  return (
    <div className="header">
            <div className="header-content">
                <div className="login" onClick={props.toLogin}>Вход</div>
                <div className="reg">регистрация</div>
            </div>
        </div>
  )
}

export default Header