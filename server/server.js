const path = require('path');
const publicPath = path.join(__dirname, '../public');

const http = require('http');

const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

app.use(express.static(publicPath));

var server = http.createServer(app);

var io = socketIO(server);

// io.on solo debe ser llamado una vez
io.on('connection', (socket) => {
  console.log('New user connection')
  
  // ---- from client to server ----
  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
  // Recibimos el emit del cliente
  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
  });
  // ---- from server to client ----
  // emit sirve para emitir un envento al cliente
  // se debe pasar el nombre del evento y la informacion
  // que se requiera, en este caso un objeto.
  socket.emit('newEmail', {
    from: 'mike@example.com',
    text: 'Hey. What is going on.',
    createAt: 123
  });

  socket.emit('newMessage', {
    from: 'alguien@example.com',
    text: 'I sent you new message',
    createAt: 456
  })
})

server.listen(port, () => {
  console.log(`Server is running port ${port}`);
})