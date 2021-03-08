import './style.css'
import React, { useState } from 'react'
import useLocalStorage from '../../helpers/useLocalStorage'
import db from '../../firebase'
import { boardstates } from '../Board'

const collection = db.collection('rooms')
function CreateRoom(props){

    const [roomid, setRoomid] = useLocalStorage("roomid", "")
    const [name, setName] = useLocalStorage("name", "")
    const [, setInRoom] = useLocalStorage("inRoom", false)
    const [errMsg, setErrMsg] = useState("")

    const createRoom = () => {
        const docRef = collection.doc(roomid); 
        docRef.get().then((doc)=>{
            if(doc.exists){
                console.log(roomid, "already exists");
                setErrMsg(`${roomid} not valid.`)
                return; 
            }
            docRef.set({players:[name],
                host: name,
                board: new Array(9).fill(boardstates.none),
                display: "Lobby",
            });
            setInRoom(true);
            console.log(`created room: ${roomid}`);
            props.setPage("GameRoom")
        });
    }
    const submit = () => {
        if(roomid === ""){
            setErrMsg("Please enter a Room ID")
            return;
        }
        if(name === "") {
            setErrMsg("Please enter a name")
            return;
        }; 
        createRoom();
    }

    return(
        <div className="create_room__container">
            <div>
                <div className="create_room__input_container">
                    <p>Roomid:</p>
                    <input className="create_room__input" value={roomid} onChange={(e)=>setRoomid(e.target.value)}/>
                </div>
                <div className="create_room__input_container">
                    <p>Name:</p>
                    <input className="create_room__input"value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                {errMsg}
            </div>
            <div className="create_room__button_container">
                <button className="button gray"onClick={()=>{props.setPage("RoomSelection")}}>Back</button>
                <button className="button"onClick={submit}>Create Room</button>
            </div>
            
        </div>
    )

}

export default CreateRoom