import React from 'react'
import { collection } from '../../firebase';
import { boardstates } from '../Board';

function LobbyButton(props){

    function start(){
        if(props.gameState.players.length !== 2)
        {
            alert("No one else in room");
            return; 
        }
        console.log(props.name)
        console.log(props.roomid)
        const docRef = collection.doc(props.roomid);
        const players = props.gameState.players
        const turn = [...players]
        if(Math.random()*2 < 1) turn.reverse();
        docRef.update({board: new Array(9).fill(boardstates.none), 
                       gameRunning: true,
                       display:"Board",
                       turn 
                    })
    }
    return <button className="button" onClick={start}> Start Game! </button>
}

export default LobbyButton