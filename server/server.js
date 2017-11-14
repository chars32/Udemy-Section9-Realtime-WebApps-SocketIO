const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
// llamamos al validador isRealString del archivo validation.js
const {isRealString} = require('./utils/validation');
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
  // escuchamos el evento join y recibimos los params
  // y el callback .
  socket.on('join', (params, callback) => {
    // si no se cumple la condicion del validador en alguna de las 
    // propiedades del params
    if (!isRealString(params.name) || !isRealString(params.room)) {
      // Regresamos el err para que se muestre en forma de alert
      callback('Name and room name are required.');
    }

    // callback();
  });
  socket.on('disconnect', () => {
    console.log('User was disconnected')
  });
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);     
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });
  // ---- from server to client ----
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
})

server.listen(port, () => {
  console.log(`Server is running port ${port}`);
})