import React, { useState, useEffect } from 'react'
import db from '../../firebase'
import RoomSelection from '../RoomSelection'
import { GameRoom} from '../../containers'
import Board, {boardstates} from '../Board'
import useLocalStorage from '../../helpers/useLocalStorage'
import roomController from '../../helpers/roomController'

const collection = db.collection("rooms")

function Game(){

    const [roomid, setRoomid] = useLocalStorage("room","")
    const [name, setName] = useLocalStorage("name", "")
    const [board, setBoard] = useState([])
    const [players, setPlayers] = useState([])
    const [databaseState, setDatabaseState] = useLocalStorage("database",{})
    const [gc, setGc] = useState(null)

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
    },[roomid])

    useEffect( () => {
        if(roomid === "" || name === "") return; 
        setGc(new roomController(roomid, name));
    },[roomid, name])

    useEffect(()=>{
        if(checkBoard())
        {
            console.log("someone just lost")
            collection.doc(roomid).update({gameRunning:false})
        }
    },[board])
    function createNewRoom(newRoomid){
        if(newRoomid ==="") return; 
        collection.doc(newRoomid).get().then((doc) => {
            if(doc.exists){
                console.log("Roomid not valid")
            }
            else{
                collection.doc(newRoomid).set({
                    "players": [name],
                    "score": {}, 
                    "gameRunning": false, 
                    "board": new Array(9).fill(boardstates.none),
                    "host": name
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
            collection.doc(roomid).update({players:[...players, name],
                })
        })
    }
    function checkRow(){
        for(let i = 0; i < 3; i++){
            const index = 3 * i; 
            if(board[index] === boardstates.none) continue; 
            else if(board[index] === board[index+1] && board[index+1] === board[index+2])
            {
                return true; 
            }
        }
        return false
    }
    function checkCol(){
        for(let col= 0; col< 3; col++){
            const indeces = [0 * 3 + col, 1 * 3 + col, 2 * 3 + col]
            if(board[indeces[0]] === boardstates.none) continue; 
            if(board[indeces[0]] === board[indeces[1]] && board[indeces[1]] === board[indeces[2]])
            {
                return true; 
            }
        }
        return false
    }
    function checkDiag(){
        if (board[4] === boardstates.none) return false; 
        if (board[0] === board[4] && board[4] === board[8]) return true; 
        if (board[2] === board[4] && board[4] === board[6]) return true;
        return false; 
    }
    function checkBoard(){
        if (board.length != 9) return false; 
        return checkRow() || checkCol() || checkDiag()
    }

    function startGame(){
        const rand = Math.floor(Math.random() * 10) % 2
        const firstPlayer = { player: players[rand], mark:boardstates.x}
        const secondPlayer = {player:players[(rand+1)%2], mark:boardstates.o}
        const turn = [firstPlayer,secondPlayer]

        collection.doc(roomid).update({turn:turn})
        collection.doc(roomid).update({board:new Array(9).fill(boardstates.none)})
        collection.doc(roomid).update({gameRunning: true})
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
        <GameRoom />
        <p> Hi {name}</p>
        <button onClick={()=>{gc.joinRoom()}}>test join</button>
        <button onClick={()=>{gc.leaveRoom()}}>test leave</button>
        </>
    )
}

export default Game