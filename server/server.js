const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

// Middleware
app.use(express.static(publicPath));

// io.on solo debe ser llamado una vez
io.on('connection', (socket) => {
  console.log('New user connection')
  
  // ---- from client to server ----
  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
  // recibimos como parametro ña funcion emitida 
  // desde el cliente(callback)
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);     
    io.emit('newMessage', generateMessage(message.from, message.text));
    // llamamos el callback y le pasamos un texto, el cual sera enviado
    // como respuesta al cliente de que el server recibio el mensaje
    callback('This is from the server');
  });
  // ---- from server to client ----
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
})

server.listen(port, () => {
  console.log(`Server is running port ${port}`);
})