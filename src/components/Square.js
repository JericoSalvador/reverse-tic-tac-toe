import React from 'react'; 

const divStyle = {
    display: "flex",
    border: "2px solid black",
    width: 100,
    height: 100, 
    justifyContent: "center",
    alignItems: "center"
}
const h1Style = {
    fontSize:100
}
export class Square extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.props.onClick()
    }
    render() {
        return (
            <div style = {divStyle} onClick={this.handleClick}> 
                <h1 style={h1Style}>{this.props.value}</h1>
            </div>
        )
    }
}