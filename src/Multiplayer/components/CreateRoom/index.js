import React from 'react'
import useLocalStorage from '../../helpers/useLocalStorage'
import db from '../../firebase'
import { boardstates } from '../Board'

const collection = db.collection('rooms')
function CreateRoom(props){

    const [roomid, setRoomid] = useLocalStorage("roomid", "")
    const [name, setName] = useLocalStorage("name", "")
    const [, setInRoom] = useLocalStorage("inRoom", false)

    const createRoom = () => {
        const docRef = collection.doc(roomid); 
        docRef.get().then((doc)=>{
            if(doc.exists){
                console.log(roomid, "already exists");
                return; 
            }
            docRef.set({players:[name],host: name,board: new Array(9).fill(boardstates.none)});
            setInRoom(true);
            console.log(`created room: ${roomid}`);
            props.setPage("GameRoom")
        });
    }
    const submit = () => {
        if(roomid === "" || name === "") return; 
        createRoom();
    }

    return(
        <div>
            <div>
                <input value={roomid} onChange={(e)=>setRoomid(e.target.value)}/>
            </div>
            <div>
                <input value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
                <button onClick={submit}>Create Room</button>
            </div>
        </div>
    )

}

export default CreateRoom