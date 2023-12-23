import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import '../styles/main.css'
import Ticket from "./Ticket";

function MainPage(props) {
    const [tickets, setTickets] = useState([])
    const [isReady, setIsReady] = useState(false)
    const filter = (ticket=>ticket.departure_city==='Москва')
    useEffect(fetchTickets, [])
    function fetchTickets() {
        axios
            .get('http://127.0.0.1:8000/1')
            .then(data => {
                setTickets(data.data)
                setIsReady(true)
            })
    }
    return(

        <div className="main">
            <div className="main-content">
                {isReady? tickets.map((ticket, id)=>{
                    return <Ticket toPayment={props.toPayment} key={id} ticket={ticket} toLogin={props.toLogin}></Ticket>    
                }):''}

            </div>
        </div>
    )
}

export default MainPage