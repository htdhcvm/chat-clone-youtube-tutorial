const expres = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const users = require("./users");

const PORT = process.env.PORT || 5000;


const app = expres();


app.use(router);

app.use(cors({
    origin: true,
    credentials: true
}));


let server = http.createServer(app);

let io = socketio(server);

io.sockets.on('connection', function (socket) {
    socket.on("join", ({name, room}, callback) => {
        console.log(name, room);

        const { error, user } = addUser({ id : socket.id, name : name, room : room});

        if( error) return callback(error);

        socket.emit("message", { user : "admin", text : `${user.name} welcome to the room ${user.room}` })

        socket.broadcast.to(user.room).emit("message", { user : "admin", text : `${user.name} has joined`})


        socket.join(user.room);

        io.to(user.room).emit("roomData", {room : user.room, users : getUsersInRoom(user.room)})

        callback();
    })

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit("message", {user : user.name, text : message});

        callback();
    });

    socket.on("disconnect", () => {
        console.log("User had left");
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit("message", { user : "admin", text : `${user.name} has left`})
            io.to(user.room).emit("roomData", { room : user.room, users : getUsersInRoom(user.room)})
        }
    })
});

server.listen(PORT, () => {
    console.log(`server has been started on ${PORT}`);

    
})

