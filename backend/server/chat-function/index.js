//Express initializes app to be a function handler to an HTTP server
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

//
const { Server } = require("socket.io");
const io = new Server(server);

//Defined a route handler / that gets called when home website opens
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


//
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

//HTTP server listens on port 3000
server.listen(3000, () => {
    console.log('listening on *:3000');
});
