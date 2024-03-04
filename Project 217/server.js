const express = require("express");
const app = express();
const server = require("http").Server(app);
app.set("view engine", "ejs");
app.use(express.static("public"));

const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});

const {ExpressPeerServer} = require("peer")
const peerserver = (server , {
    debug : true
}) 

app.use("/peersjs" , peerserver)

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/:room", (req, res) => {
    res.render("index", { roomId: req.params.room });
});

app.get(app.get("/:room", (req, res) => { 
    res.render("index", { roomId: req.params.room }); 
}));


io.on("connection", (socket) => {
    socket.on("message", (message) => {
        io.emit("createMessage", message);
    });
});

server.listen(3030);