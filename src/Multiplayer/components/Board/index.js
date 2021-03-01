import Box from '../Square'
export const boardstates = {
    none : -1, 
    x: 1, 
    o: 0,
}

function Board(props){
    return(<div>
        <p>Board</p>
        {new Array(3).fill(null).map((_,row)=>
            <div key={`row${row}`}style={{display:"flex"}}>
                {new Array(3).fill(null).map(
            (_,col)=><Box key={`row${row}col${col}`} id={row*3 + col}
                boardstatus={props.board[row * 3 + col]} 
                />)}
            </div>)}
    </div>)
}

export default Board