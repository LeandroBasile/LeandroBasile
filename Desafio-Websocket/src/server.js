const Contenedor = require("../api");

const prod = new Contenedor("productos.txt");
const chat = new Contenedor('chat.txt')

const express = require("express");
const app = express();
const path = require("path");
const { Server: IOServer } = require("socket.io");

const expressServer = app.listen(8080, (req, res) =>
  console.log(`Servidor escuchando`)
);

const io = new IOServer(expressServer);


app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", async (socket) => {
  console.log(`Se conecto un usuario, ID: ${socket.id}`);
  let products = await prod.getAll().then((res) => {
    return res;
  });

  socket.emit("server:productos", products);

  console.log(products);

  socket.on("cliente:producto", async (producto) => {
    await prod.save(producto);
    setTimeout(async () => {
      let products = await prod.getAll().then((res) => {
        return res;
      });

      io.emit("server:productos", products);
    }, 200);
  });

  let arrChat = await chat.getAll().then(res=>{return res})
  socket.emit('server:chat',arrChat)


  socket.on('cliente:emailMensaje', async(emailMensaje)=>{
    // console.log(emailMensaje)
    await chat.save(emailMensaje);
    setTimeout(async () => {

    let arrChat = await chat.getAll().then(res=>{return res})
    io.emit('server:chat',arrChat)
    },200)

  })


});
