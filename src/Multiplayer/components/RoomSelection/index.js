import './style.css'
import React from 'react'

function RoomSelection({setPage}){

    return(
        <div className="Room_Selection__container">
            <h1 className="Room_Selection__title">Tic Tac Toe</h1>

            <div className="Room_Selection__button_container">
                <button className="button" onClick={()=>setPage("CreateRoom")}>Host Game</button>
                <button className="button" onClick={()=>setPage("JoinRoom")}>Join Game</button>
            </div>
        </div>
    )
}

export default RoomSelection