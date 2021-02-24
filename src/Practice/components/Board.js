import React, { useEffect, useState } from 'react'
import { Square } from './Square'
import { ScoreBoard } from './ScoreBoard'
import { Rules } from './Rules'

const buttonStyle = {
    padding:5,
    margin:5,
}
export function  Board () {

    const [state, setState] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null], 
    ])

    const [playersTurn, setPlayersTurn] = useState("X")
    const [isWinner, setIsWinner] = useState(null)
    const [undoStack, setUndoStack] = useState([])
    const [redoStack, setRedoStack] = useState([])
    
    const changeTurn = () => setPlayersTurn( (prevPlayersTurn) => 
        prevPlayersTurn === "X" ? "O" : "X"
    )
    const deepcopy = (arr) => {
        return arr.map( (item) => [...item])
    }

    function changeValue(col, row) {
        if (isWinner) return;
        if (state[col][row] === null){
            let newState = deepcopy(state)
            setUndoStack((prev) => [...prev, [...state]])
            newState[col][row] = playersTurn
            setState(newState)
            setRedoStack([])
            changeTurn()
        }
    }
    const checkCol = () => {
        let winner = null 
        for(let i = 0; i < 3; i++){
            if(state[i][0] === null) continue;
            
            if(state[i][0] === state[i][1] && state[i][1] === state[i][2]){
                winner = state[i][0]
                return winner 
            }
        }
        return winner 
    }
    const checkRow = () => {
        let winner = null
        for(let i = 0; i < 3; i++){
            if(state[0][i] === null) continue;
            
            if(state[0][i] === state[1][i] && state[1][i] === state[2][i]){
                winner = state[0][i]
                return winner 
            }
        }
        return winner 
    }
    const checkDiagonal = () => {
        if (state[1][1]){
            if(state[0][0] === state[1][1] && state[1][1] === state[2][2]) return state[1][1];
            if(state[0][2] === state[1][1] && state[1][1] === state[2][0]) return state[1][1];
        }
        return null 
    }
    useEffect( () => {
        let loser= checkCol()? checkCol(): checkRow()
        if (loser=== null){
            loser = checkDiagonal()
        }
        if (loser){
            const winner = loser==="X"? "O" :"X"
            setIsWinner(winner)
        }
    }, [state])

    function restart(){
        setState([
            [null, null, null],
            [null, null, null],
            [null, null, null], 
        ])
        setUndoStack([])
        setRedoStack([])
        setIsWinner(null)
    }
    function undo(){
        if (undoStack.length===0) return;
        if (isWinner) return; 
        const newState = undoStack.pop()
        redoStack.push([...state])
        setRedoStack(redoStack)
        setState(newState)
        setUndoStack(undoStack)
        changeTurn()
    }
    function redo(){
        if (redoStack.length===0) return; 
        if (isWinner) return;
        const newState = redoStack.pop()
        setUndoStack((prev) => [...prev, [...state]])
        setRedoStack(redoStack)
        setState(newState)
        changeTurn()
    }
    
    const [showRules, setShowRules] = useState(false)
    function toggleRules(){
        setShowRules(!showRules) 
    }
    
    return(
        <div>
            <div style={{padding:10}} >
                <ScoreBoard player={playersTurn}/>
                {isWinner && <h1>{isWinner} Won</h1>}
            </div>
            <div style={{padding:10}}>
                <div style={{display:'flex'}}> 
                    <Square value={state[0][0]} onClick={() => changeValue(0,0)}/>
                    <Square value={state[1][0]} onClick={() => changeValue(1,0)}/>
                    <Square value={state[2][0]} onClick={() => changeValue(2,0)}/>
                </div>
                <div style={{display:'flex'}}> 
                    <Square value={state[0][1]} onClick={() => changeValue(0,1)}/>
                    <Square value={state[1][1]} onClick={() => changeValue(1,1)}/>
                    <Square value={state[2][1]} onClick={() => changeValue(2,1)}/>
                </div>
                <div style={{display:'flex'}}> 
                    <Square value={state[0][2]} onClick={() => changeValue(0,2)}/>
                    <Square value={state[1][2]} onClick={() => changeValue(1,2)}/>
                    <Square value={state[2][2]} onClick={() => changeValue(2,2)}/>
                </div>
            </div>
            <button style={buttonStyle} onClick={restart}>Clear</button>
            <button style={buttonStyle} onClick={undo}>Undo</button>
            <button style={buttonStyle} onClick={redo}>Redo</button>
            <button style={buttonStyle} onClick={toggleRules}>Toggle Rules</button>
            <Rules showRules={showRules}/>
        </div>

    )
}