require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {v4: uuidv4} = require('uuid');
const { socketController } = require('./sockets/controller.sockets');

// database connect


// middlewares
app.use(express.static('public'));
//app.use( ({origin:['www.ejemplo.com']})); // permitir solo ese origen
app.use(cors());

// Sockets
io.on('connection', socketController);
  

//routes


server.listen(port, () => {
    console.log(`Establishied connection on port ${port}`);
})

