import React from 'react' 
import { PropTypes } from 'prop-types'

function WaitingRoom({roomid, players, }){
    
    return(
        <div> 
            <p> RoomId: {roomid} </p>
            <ul>
            {players.map((player, index)=><li key={index}>{player}</li>)}
            </ul>
        </div>
    )
}

WaitingRoom.propTypes = {
    roomid: PropTypes.string, 
    players: PropTypes.array, 
}
export default WaitingRoom