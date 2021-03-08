import React, { useState, useEffect } from 'react';
import useLocalStorage from '../../helpers/useLocalStorage';
import db from '../../firebase';
import Board from '../Board';
import Lobby from '../Lobby';
import BoardControls from '../BoardControls';

import './style.css'

const collection = db.collection('rooms');
function GameRoom(props){
    
    const [gameState, setGameState] = useState({});
    const [roomid, ] = useLocalStorage('roomid', null)
    const [name, ] = useLocalStorage('name', null)

    useEffect(()=>{
        if(roomid===null) return; 
        const docRef = collection.doc(roomid)
        const unsub = docRef.onSnapshot((doc)=>{
            if(!doc.exists){
                console.error("Error doc doesn't exist"); 
                props.setPage("RoomSelection")
            }
            else{
                setGameState(doc.data());
            }
        })

        return ()=>{unsub()}
    },[]);

    function leaveRoom(){
        if(name === gameState.host)
            collection.doc(roomid).delete().then(()=>{
                console.log("Game left successfully")
                props.setPage("RoomSelection")
            }).catch((error)=>{
                console.error(`Error ${error}`)
            })

        else{
            const players = gameState.players;
            const newPlayers = players.filter((player)=>{return player !== name})
            collection.doc(roomid).update({players:newPlayers,display:"Lobby"})
            console.log("Left Game")
            props.setPage("RoomSelection")
        }
    }

    return(
        <div className="game_room__container">
            <div className="game_room__header">
                <div className="game_room__header_info">
                    <p>Room ID: {roomid}</p>
                    <p>Your name: {name}</p>
                </div>
                <button id="leave-button" className="button danger"onClick={leaveRoom}>Leave Room</button>
            </div>
            {gameState.display === "Lobby" && <Lobby roomid={roomid} name={name}gameState={gameState} />}
            {gameState.display === "Board" && <Board gameState={gameState}> <BoardControls roomid={roomid}  gameState={gameState} /></Board>}
        </div>
    );
}

export default GameRoom