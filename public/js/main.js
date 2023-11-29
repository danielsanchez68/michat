console.log('App Chat Websocket Client')

const socket = io.connect()

socket.on('mensajes', mensajes => {
    console.log(mensajes)
    render(mensajes)
})

function render(mensajes) {
    const html = mensajes.map( mensaje => `
        <div>
            <b>${mensaje.autor}</b>
            <i>${mensaje.texto}</i>
        </div>
    `).join(' ')

    document.getElementById('mensajes').innerHTML = html
}


function addMensaje(e) {
    e.preventDefault()

    console.log('addMensaje')

    const mensaje = {
        autor: document.getElementById('autor').value,
        texto: document.getElementById('texto').value,
    }
    socket.emit('nuevo-mensaje', mensaje)
}

document.querySelector('form').addEventListener('submit', addMensaje)