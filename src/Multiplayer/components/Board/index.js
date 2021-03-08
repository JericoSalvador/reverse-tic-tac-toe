import Box from '../Square'
export const boardstates = {
    none : -1, 
    x: 1, 
    o: 0,
}

function Board(props){
    return(<div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <p>Board</p>
            {props.gameState.gameRunning && <p>{props.gameState.turn[0]}'s turn</p>}
        </div>
        {new Array(3).fill(null).map((_,row)=>
            <div key={`row${row}`}style={{display:"flex"}}>
                {new Array(3).fill(null).map(
            (_,col)=><Box key={`row${row}col${col}`} id={row*3 + col}
                    gameState={props.gameState}
                    boardStatus={props.gameState.board[row*3+col]}
                />)}
            </div>)}
    </div>)
}

export default Board