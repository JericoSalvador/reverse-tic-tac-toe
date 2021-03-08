import React, { useEffect } from 'react';
import useLocalStorage from '../../helpers/useLocalStorage';
import db from '../../firebase';
import Board, { boardstates } from '../Board';

const collection = db.collection('rooms');
function GameRoom(props){
    
    const [gameState, setGameState] = useLocalStorage('gameState',null);
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
                console.log(doc.data())
                setGameState(doc.data());
            }
        })

        return ()=>{unsub()}
    },[]);

    function clearBoard(){
        if(gameState.players.length !== 2)
        {
            alert("No one else in room")
            return; 
        }
        const docRef = collection.doc(roomid)
        const players = gameState.players
        const turn = [...players]
        if(Math.random()*2 < 1) turn.reverse();
        docRef.update({board: new Array(9).fill(boardstates.none), 
                       gameRunning: true,
                       turn 
                    })
    }
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
            collection.doc(roomid).update({players:newPlayers})
            console.log("Left Game")
            props.setPage("RoomSelection")
        }
    }

    return(
        <div>
            <h2>Game Room</h2>
            { gameState!= null && <Board gameState={gameState} />}
            
            <button onClick={clearBoard}>clear</button>
            <button onClick={leaveRoom}>Leave Game</button>
        </div>
    );
}

export default GameRoom