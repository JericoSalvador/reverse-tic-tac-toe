import React from 'react'
import useLocalStorage from '../../helpers/useLocalStorage'
import RoomSelection from '../RoomSelection'
import CreateRoom from '../CreateRoom'
import JoinRoom from '../JoinRoom'
import GameRoom from '../GameRoom'

import './style.css'

function PageSelector(){
    
    const [page,setPage] = useLocalStorage("page", "RoomSelection")

    return(
        <div className="outer_container"> 
            <div className="inner_container">
                {page==="RoomSelection" && <RoomSelection setPage={setPage}/>}
                {page==="CreateRoom" && <CreateRoom setPage={setPage}/>}
                {page==="JoinRoom" && <JoinRoom setPage={setPage}/>}
                {page==="GameRoom" && <GameRoom setPage={setPage}/>}
            </div>
        </div>
    )
}

export default PageSelector