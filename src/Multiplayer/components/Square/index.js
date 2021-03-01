
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
    function changeToX(){
        const room = JSON.parse(localStorage.getItem('room'))
        const board = JSON.parse(localStorage.getItem('board'))
        board[props.id] = boardstates.o
        const docRef = db.collection('rooms').doc(room)
        docRef.update({board:board})
    }
    return(
    <div style={{border:"1px solid black",width:100, height:100,display:'flex',alignItems:'center',justifyContent:'center'}}
         onClick={changeToX}
        >
        <h1 style={{fontSize:'100px'}}>
        {toString(props.boardstatus)}
        </h1>
    </div>
    )
}

export default Box 