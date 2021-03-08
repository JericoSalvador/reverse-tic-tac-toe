
import db from '../../firebase'
import React from 'react'
import {boardstates} from '../Board'

function toString(boardstatus){ 
    if(boardstatus === boardstates.none)
    {
        return ""
    }
    
    else if(boardstatus === boardstates.x)
        return "X" 

    else if(boardstatus === boardstates.o)
        return "O"
}

function Box(props){
    function markBox(){
        const name = JSON.parse(localStorage.getItem('name'))
        const room = JSON.parse(localStorage.getItem('roomid'))
        const database = props.gameState

        if(!database.gameRunning) return;

        let player = database.turn[0]
        let mark;
        if(player === database.host) mark = boardstates.x;
        else mark = boardstates.o;

        if(player !== name) return;

        const board = database.board; 
        board[props.id] = mark;

        const docRef = db.collection('rooms').doc(room)
        docRef.update({board:board})

        const updatedTurn = database.turn
        let turn = updatedTurn.shift()
        updatedTurn.push(turn)
        docRef.update({turn:updatedTurn})

    }
    return(
    <div style={{border:"1px solid black",width:100, height:100,display:'flex',alignItems:'center',justifyContent:'center'}}
         onClick={markBox}
        >
        <h1 style={{fontSize:'100px'}}>
        {toString(props.gameState.board[props.id])}
        </h1>
    </div>
    )
}

export default Box 