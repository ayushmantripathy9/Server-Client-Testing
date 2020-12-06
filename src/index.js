import React from 'react'
import ReactDOM from 'react-dom'
import socketIOClient from "socket.io-client";

var socket 

class Canvas extends React.Component{
    constructor(props){
        super(props)
        this.state={
            val : 0,
            name : 'Ayushman',
            endpoint : 'http://localhost:4002'
        }
        this.handleClick = this.handleClick.bind(this)
        socket =socketIOClient(this.state.endpoint)
    }
    getData = checkString => {
        console.log(checkString)
        this.setState(
            {
                name: checkString,
            }
        )
        
    }
    componentDidMount(){
        socket.emit("initial_data")
        socket.on("get_data",this.getData)

    }
    componentDidUpdate(){
        
    }
    componentWillUnmount(){
        socket.off("get_data")
        socket.off("change_data")
    }
    handleClick(){
        this.setState(
            {
                val : this.state.val+1,
            }
        )
        socket.emit("change_data",this.state.val)
    }
    render(){
        return(
            <div>
                <div>
                    Click the button below to send request {this.state.val}.
                </div>
                <p></p>
                <button
                    onClick = {this.handleClick}
                >
                    SEND
                </button>
                <p></p>
                Name value now : {this.state.name}
            </div>
        );
    }
}

ReactDOM.render(
    <Canvas />,document.getElementById('root')
)