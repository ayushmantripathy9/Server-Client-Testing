const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// our localhost port
const port = process.env.PORT || 4002;
const app = express();
// our server instance
const server = http.createServer(app);
// This creates our socket using the instance of the server
const io = require('socket.io')(server,{
    cors:   {
        origin : '*',
   }}
);

io.on(
    "connection",socket=>{
        socket.on("initial_data",()=>{
            console.log('Initial Data Request Found')
            io.sockets.emit("get_data",'Name changed to Tripathy')
        });
        socket.on("change_data",(value)=>{
            console.log('Change Data Request Found with value = '+value)
            io.sockets.emit("get_data",'Change data catered to '+value)
        });
        socket.on("disconnect",()=>{
            console.log("Client Disconnected")
        });
    }
);


app.use(express.static("build"));
server.listen(port, () => console.log(`Listening on port ${port}`));