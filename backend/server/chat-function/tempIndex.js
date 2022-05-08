//Express initializes app to be a function handler to an HTTP server
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

//
const { Server } = require("socket.io");
const io = new Server(server);

//Defined a route handler / that gets called when home website opens
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


//
io.on('connection', (socket) => {
	console.log("connected");

	socket.on("join", ({ name, room }) => {
		const { error, user } = addUser({ id: socket.id, name, room });
		if (error) {
			return;
		}
		console.log("joined");

		socket.emit("message", {
			user: "admin",
			text: `${user.name}, welcome to the room!`,
		});
		socket.broadcast.to(user.room).emit("message", {
			user: "admin",
			text: `${user.name} has joined to room.`,
		});

		socket.join(user.room);

		io.to(user.room).emit("roomData", {
			room: user.room,
			users: getUsersInRoom(user.room),
		});
	});

    socket.on('chat message', (msg) => {
		const user = getUser(socket.id);

		try {
			io.to(user.room).emit("chat message", { user: user.name, text: msg });
			io.to(user.room).emit("roomData", {
				room: user.room,
				users: getUsersInRoom(user.room),
			});
			callback();
		} catch (err) {
			console.log(err.message);
		}
	});

	socket.on("disconnect", () => {
		const user = removeUser(socket.id);
		console.log("disconnected");

		if (user) {
			io.to(user.room).emit("message", {
				user: "admin",
				text: `${user.name} has just left!`,
			});
		}
	});
});

//HTTP server listens on port 3000
server.listen(3000, () => {
    console.log('listening on *:3000');
});
