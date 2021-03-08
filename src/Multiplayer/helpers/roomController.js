import db from '../firebase'

const collection = db.collection('rooms')
class roomController{

    constructor(roomid, name){
        this.name = name;
        this.roomid = roomid; 
        this.inRoom = false; 
        this.docRef = collection.doc(roomid);
        console.log("room controller obejct created")
    }

    createRoom(){
        this.docRef.get().then((doc)=>{
            if(doc.exists){
                console.log(this.roomid, "already exists")
                return; 
            }
            this.docRef.set({players:[this.name],host: this.name, })
            this.inRoom = true; 
            console.log(`created room: ${this.roomid}`)
        });
    }

    joinRoom(){
        if(this.inROom) return; 

        this.docRef.get().then((doc)=>{
            if(!doc.exists){
                console.log(this.roomid, "does not exist");
                return; 
            }
            const players = doc.data().players; 
            if(players.length>= 2)
            {
                console.log(this.roomid, "is full");
                return;
            }
            if(players.includes(this.name)){
                console.log(this.name, "already in room");
                return;
            }
            players.push(this.name); 
            this.docRef.update({players:players});
            this.inRoom = true; 
            console.log(`Joined: ${this.roomid} as ${this.name}`)
        });
    }

    leaveRoom(){
        if(!this.inRoom){
            console.log("Not in a room. Cannot leave.")
            return; 
        }
        this.docRef.get().then((doc)=>{
            const players = doc.data().players;
            players.splice(players.indexOf(this.name), 1); 
            this.docRef.update({players:players});
            this.inRoom = false; 
        });
    }
}

export default roomController 