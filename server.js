const express = require('express')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const mensajes = [
    { autor: 'Juan', texto: 'Hola que tal!' }
]

app.use(express.static('public'))

app.get('/ping', (req,res) => {
    res.send('pong')
})

io.on('connection', socket => {
    console.log('Un cliente se ha conectado')

    socket.emit('mensajes', mensajes)
    socket.on('nuevo-mensaje', mensaje => {
        console.log(mensaje)
        mensajes.push(mensaje)
        io.sockets.emit('mensajes', mensajes)
    })
})


const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log(`Servidor http con WebSockets escuchando en el http://localhost:${PORT}`))
    .on('error', error => console.log(`Error en servidor: ${error.message}`))


