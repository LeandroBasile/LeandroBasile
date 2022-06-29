const socket = io();
//Productos
const prodInput = document.querySelector('#prodInput')
const prirceInput = document.querySelector('#priceInput')
const thumbnailInput = document.querySelector('#thumbnailInput')
const formCarga = document.querySelector('#formCarga')
//Mensajes
const  inputMensaje = document.querySelector('#inputMensaje')
const  inputEmail = document.querySelector('#inputEmail')
const  formMensajes = document.querySelector('#formMensajes')
const  mensajes = document.querySelector('#mensajes')


async function renderProductos(productos) {
  await fetch("/plantilla1.hbs").then((response) => {
    response.text().then((plantilla) => {
        document.querySelector("#productos").innerHTML = ' '
        productos.forEach((producto) => {
            
        const template = Handlebars.compile(plantilla);
        const html = template(producto);
        document.querySelector("#productos").innerHTML += html;
      });
    });
  });
}
//Evento para productos
formCarga.addEventListener('submit', (e)=>{
    e.preventDefault()
    // const producto = {title:prodInput.value,price:prirceInput.value,thumbnail:thumbnailInput.value}
    const producto = {title:prodInput.value,price:prirceInput.value,thumbnail:thumbnailInput.value}

    socket.emit('cliente:producto',producto)
    
})

//Evento para mensajes
formMensajes.addEventListener('submit',async (e)=>{
  e.preventDefault()


  let date = new Date();
  let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
  let hora = date.getHours()
  let minutos = date.getMinutes()
  let segundos = date.getSeconds()
  const emailMensaje = {email:inputEmail.value,mensaje:inputMensaje.value,fecha:output,hora:`${hora}:${minutos}:${segundos}`}
  // const emailMensaje = {email:'HOLA',mensaje:'hola'}

  socket.emit('cliente:emailMensaje', emailMensaje)
  
})

socket.on("server:productos",async (produ) => {
    console.log(produ)
    renderProductos(produ);
});

function renderMessage(messageArr){
  const html =messageArr.map(messInfo=>{
      return(`<div>
      <strong style="color:blue">${messInfo.email}</strong><em style="color:brown">[Fecha y Hora (${messInfo.fecha} ${messInfo.hora})] :</em>
      <i style="color:green">${messInfo.mensaje}</i>

      </div>`)
  }).join(' ')

  mensajes.innerHTML= html
}



socket.on("server:chat",async (chat) => {
  console.log(chat)
  renderMessage(chat)
});


