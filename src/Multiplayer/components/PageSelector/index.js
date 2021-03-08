import React from 'react'
import useLocalStorage from '../../helpers/useLocalStorage'
import RoomSelection from '../RoomSelection'
import CreateRoom from '../CreateRoom'
import JoinRoom from '../JoinRoom'
import GameRoom from '../GameRoom'

function PageSelector(){
    
    const [page,setPage] = useLocalStorage("page", "RoomSelection")

    return(
        <div> 
            <div className="Navbar">
                <button onClick={()=>setPage("RoomSelection")}>RoomSelection</button>
                <button onClick={()=>setPage("CreateRoom")}>CreateRoom</button>
                <button onClick={()=>setPage("JoinRoom")}>JoinRoom</button>
                <button onClick={()=>setPage("GameRoom")}>GameRoom</button>
            </div>
            {page==="RoomSelection" && <RoomSelection setPage={setPage}/>}
            {page==="CreateRoom" && <CreateRoom setPage={setPage}/>}
            {page==="JoinRoom" && <JoinRoom setPage={setPage}/>}
            {page==="GameRoom" && <GameRoom setPage={setPage}/>}
        </div>
    )
}

export default PageSelector