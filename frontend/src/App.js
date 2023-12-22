import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import './styles/main.css'
import Ticket from "./components/Ticket";

const App = () => {
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
        <div>
        <div className="header">
            <div className="header-content"></div>
        </div>
        <div className="main">
            <div className="main-content">
                {isReady? tickets.map((ticket, id)=>{
                    return <Ticket key={id} ticket={ticket}></Ticket>    
                }):''}

            </div>
        </div>
        </div>
    )
}
export default App