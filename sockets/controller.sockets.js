const { v4: uuidv4 } = require('uuid');

const socketController = socket => {
    console.log('connected client', socket.id); 

    socket.on('disconnect', () => {
        console.log('disconnected client');
    });

    socket.on('enviar-mensaje', (payload,callback) => {
        console.log('si se escucho', payload);
        const id = uuidv4();
        callback(id);
        socket.broadcast.emit('enviar-mensaje-todos', payload);
    })
}

module.exports = {
    socketController
}