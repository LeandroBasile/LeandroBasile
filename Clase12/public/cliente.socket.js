const socket = io()

const usuarioInput =document.querySelector('#usuarioInput')
const messageInput =document.querySelector('#messageInput')
const messagesPool =document.querySelector('#messagesPool')
const messageForm =document.querySelector('#messageForm')

function sendMessage(messageInfo){
// const usuarioInput =document.querySelector('#usuarioInput')
    socket.emit('cliente:message',messageInfo)
}

function renderMessage(messageArr){
    const html =messageArr.map(messInfo=>{
        return(`<div>
        <strong>${messInfo.username}</strong>
        <em>${messInfo.message}</em>

        </div>`)
    }).join(' ')

    messagesPool.innerHTML= html
}

messageForm.addEventListener('submit', e=>{
    e.preventDefault()
   const messageInfo = {username:usuarioInput.value,message:messageInput.value} 
    sendMessage(messageInfo)
})



socket.on('server:message', renderMessage)