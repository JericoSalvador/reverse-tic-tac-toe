import React, { useState } from 'react'
import db from '../../firebase'
import useLocalStorage from '../../helpers/useLocalStorage'

const collection = db.collection('rooms') 
function JoinRoom(props){

    const [roomid, setRoomid] = useLocalStorage("roomid", "")
    const [name, setName] = useLocalStorage("name", "")
    const [inRoom, setInRoom] = useLocalStorage("inRoom", false)
    const [errMsg, setErrMsg] = useState("")

    const joinRoom = ()=>{
        // if(inRoom) return; 
        const docRef = collection.doc(roomid); 
        docRef.get().then((doc)=>{
            if(!doc.exists){
                setErrMsg(`${roomid} does not exist`)
                return; 
            }
            const players = doc.data().players; 
            if(players.length>= 2)
            {
                setErrMsg(`${roomid} is full`);
                return;
            }
            if(players.includes(name)){
                setErrMsg(`${name}already in room`);
                return;
            }
            players.push(name); 
            docRef.update({players});
            setInRoom(true);
            console.log(`Joined: ${roomid} as ${name}`)
            props.setPage("GameRoom")
        });
    }

    const submit = () => {
        setErrMsg("")
        if(roomid === "" || name === "") return; 
        joinRoom();
    }

    return(
        <div>
            <div>
                <input value={roomid} onChange={(e)=>setRoomid(e.target.value)}/>
            </div>
            <div>
                <input value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            {errMsg !== "" && <p>{errMsg}</p>}
            <div>
                <button onClick={submit}>Join Room</button>
            </div>
        </div>
    )

}

export default JoinRoom 