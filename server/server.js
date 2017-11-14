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
  
  // ---- from client to server ----.
  socket.on('join', (params, callback) => {

    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.');
    }

    socket.join(params.room);

    //io.emit <--- a todos los que esten conectados
    //socket.broadcast.emit <--- lo manda a todos conectados al socket excepto al usuario que lo manda.
    //socket.emit <--- manda el mensaje especificamente a un usuario.

    // --- Para los rooms
    //io.to('name room').emit <--- a todos los que esten conectados a ese room
    //socket.broadcast.to('name room').emit <--- lo manda a todos conectados al socket del room excepto al usuario que lo manda.

    // Movimos estos emit para que solo sean visto por las personas que estan en el room
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} hass joined`));
    
    callback();
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
  // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
})

server.listen(port, () => {
  console.log(`Server is running port ${port}`);
})