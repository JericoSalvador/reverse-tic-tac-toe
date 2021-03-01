import React, { useState } from 'react'

function RoomSelection(props){
    
    const [roomid, setRoomid] = useState("")
    const [name, setName] = useState("")
    
    const onSubmit = ()=>{
        if(!roomid) return; 
        if(!name) return; 

        props.changeRoom(roomid)
        props.changeName(name)
    }

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex'}}>
                <p>Enter room: </p>
                <input value = {roomid} onChange={(e)=>setRoomid(e.target.value)}></input>
            </div>
            <div style={{display:'flex'}}>
                <p>Enter Name:</p>
                <input value = {name} onChange={(e)=>setName(e.target.value)}></input>
            </div>
            <button onClick={onSubmit}>Join Room</button>

        </div>
    )

}

export default RoomSelection