
export function Rules(props) {
    
    return (
        <div style={{width:300}}>
            {props.showRules && <p>Make your opponent get 3 in a row, column, or diagonal.</p>}
        </div>
    )
}