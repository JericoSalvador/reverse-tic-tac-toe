import React, { useState } from 'react'; 
import {boardstates} from '../components'
import roomController from '../gameController'

class gameController extends roomController{
    
    constructor(roomid, name){
        super(roomid, name);
        [this.state, this.setState] = useState({}); 
    }
}

export default gameController