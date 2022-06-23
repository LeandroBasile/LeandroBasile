const express = require("express");
const { Server: IOServer } = require("socket.io");
const app = express();
const expressServer = app.listen(8080, () => console.log("Escuchando"));
const io = new IOServer(expressServer);
const path = require("path");
const messageArr = []
app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
    socket.emit('server:message',messageArr)
  console.log(`se conecto un usuario: ${socket.id}`);
    socket.on('cliente:message',messageInfo=>{
        messageArr.push(messageInfo)

        io.emit('server:message',messageArr)
    })

});
