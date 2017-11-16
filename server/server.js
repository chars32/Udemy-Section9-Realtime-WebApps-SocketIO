const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
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
    
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    
    callback();
  });
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
  socket.on('createMessage', (message, callback) => {
    // obtenemos el usuario
    var user = users.getUser(socket.id);
    // checamos que exista el usuario y que el mensaje no venga vacio
    if (user && isRealString(message.text)) {
      // emitimos solo al room en el que se encuentre
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });
  socket.on('createLocationMessage', (coords) => {
    // hacemos lo mismo que en createMessage
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
  });
})

server.listen(port, () => {
  console.log(`Server is running port ${port}`);
})