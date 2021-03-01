import React, { useState, useEffect } from 'react'
import db from '../../firebase'
import RoomSelection from '../RoomSelection'
import { WaitingRoom } from '../../containers'
import Board, {boardstates} from '../Board'
import useLocalStorage from '../../helpers/useLocalStorage'

const collection = db.collection("rooms")
function Game(){

    const [roomid, setRoomid] = useLocalStorage("room","")
    const [name, setName] = useLocalStorage("name", "")
    const [board, setBoard] = useLocalStorage("board",[])
    const [players, setPlayers] = useState([])
    const [databaseState, setDatabaseState] = useLocalStorage("database",{})

    useEffect( () => {
        if( roomid === "") return; 
        const unsub = collection.doc(roomid).onSnapshot((doc)=>{
            if(doc.exists){
                const data = doc.data()
                setPlayers(data.players)
                setBoard(data.board)
                setDatabaseState(data)
                console.log(data)
            }
        })
        return ()=>{unsub()}
    },[roomid])
    function createNewRoom(newRoomid){
        if(newRoomid ==="") return; 
        collection.doc(newRoomid).get().then((doc) => {
            if(doc.exists){
                console.log("Roomid not valid")
            }
            else{
                collection.doc(newRoomid).set({
                    "players": [],
                    "score": {}, 
                    "board": new Array(9).fill(boardstates.none),
                })
            }
            
        }).catch((error) => {
            console.log(`Error: ${error}`)
        })
    }
    function joinRoom(){
        if(!name) return; 
        collection.doc(roomid).get().then( doc => {
            if(!doc.exists){ 
                console.log("Room doesnt exist"); 
                return; 
            }
            if(doc.data().players.length >= 2){
                console.log("Room is full")
            }
            else 
            collection.doc(roomid).update({players:[...players, name]})
        })
    }

    function startGame(){
        const rand = Math.floor(Math.random() * 10) % 2
        collection.doc(roomid).update({turn:rand})
        collection.doc(roomid).update({board:new Array(9).fill(boardstates.none)})
    }

    const test = () => {
        
        collection.get().then(snapshot => {
            snapshot.docs.forEach(doc=>{
                if(doc.exists){
                    console.log(doc.id)
                    console.log(doc.data())
                }

            })
        })
    }

    return(
        <>
        <RoomSelection changeRoom={setRoomid} changeName={setName}/>
        <WaitingRoom players={players} roomid={roomid} />
        <button onClick={()=>createNewRoom(roomid)}> create room</button>
        <button onClick={joinRoom}> join room</button>
        <button onClick={test}>Test</button>
        <button onClick={startGame}>Start</button>

        <Board board={board} /> 
        </>
    )
}

export default Game