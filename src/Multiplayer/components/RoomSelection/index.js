import React, { useState } from 'react'

function RoomSelection({setPage}){

    return(
        <div>
            <button onClick={()=>setPage("CreateRoom")}>Host Game</button>
            <button onClick={()=>setPage("JoinRoom")}>Join Game</button>
        </div>
    )
}

export default RoomSelection