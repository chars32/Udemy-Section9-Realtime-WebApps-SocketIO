const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
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
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);     
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });
  // aqui esperamos el evento createLocationMessage y le 
  // pasamos las coords que vienen del cliente
  socket.on('createLocationMessage', (coords) => {
    // lo emitimos a todos newLocationMessage y la funcion generateLocationMessage
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });
  // ---- from server to client ----
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
})

server.listen(port, () => {
  console.log(`Server is running port ${port}`);
})