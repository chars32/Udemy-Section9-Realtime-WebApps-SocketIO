const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation');
// Llamos a Users del archivo utils/users.js
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
// instanciamos Users en la variable users
// para asi poder usar sus metodos.
var users = new Users();

// Middleware
app.use(express.static(publicPath));

// io.on solo debe ser llamado una vez
io.on('connection', (socket) => {
  console.log('New user connection')
  
  // ---- from client to server ----.
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    // se une al room
    socket.join(params.room);
    // eliminamos al user si esta en otro room.
    users.removeUser(socket.id);
    // agregamos al user al room.
    users.addUser(socket.id, params.name, params.room);
    // enviamos al room la lista actualizada.
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    
    callback();
  });
  socket.on('disconnect', () => {
    // eliminamos al usuario de la lista
    var user = users.removeUser(socket.id);

    if (user) {
      // actualizamos la lista y la mandamos al room
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      // emitimos un nuevo mensaje de que ha salido dle room
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);     
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });
})

server.listen(port, () => {
  console.log(`Server is running port ${port}`);
})