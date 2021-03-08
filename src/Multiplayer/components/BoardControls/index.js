import React from 'react'
import { boardstates } from '../Board';
import { collection } from '../../firebase'

function BoardControls(props){

    function clearBoard(){
        const docRef = collection.doc(props.roomid)
        const players = props.gameState.players
        const turn = [...players]
        if(Math.random()*2 < 1) turn.reverse();
        docRef.update({board: new Array(9).fill(boardstates.none), 
                       gameRunning: true,
                       turn 
                    })
    }

    return (<div>
        <button className="button gray"onClick={clearBoard}>Clear Board</button>
        </div>)
}

export default BoardControls 