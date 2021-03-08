import React, { useState } from 'react'
import db from '../../firebase'
import useLocalStorage from '../../helpers/useLocalStorage'

const collection = db.collection('rooms') 
function JoinRoom(props){

    const [roomid, setRoomid] = useLocalStorage("roomid", "")
    const [name, setName] = useLocalStorage("name", "")
    const [errMsg, setErrMsg] = useState("")

    const joinRoom = ()=>{
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
            console.log(`Joined: ${roomid} as ${name}`)
            props.setPage("GameRoom")
        });
    }

    const submit = () => {
        setErrMsg("")
        if(roomid === ""){
            setErrMsg("Please enter a Room ID")
            return;
        }
        if(name === "") {
            setErrMsg("Please enter a name")
            return;
        }; 
        joinRoom();
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
                <button className="button"onClick={submit}>Join Room</button>
            </div>
            
        </div>
    )

}

export default JoinRoom 