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

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    // pasamos el evento newMessage y hacemos 
    // el emit pasando el objeto con los datos
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime

    })
  });
  // ---- from server to client ----
  // socket.emit('newMessage', {
  //   from: 'alguien@example.com',
  //   text: 'I sent you new message',
  //   createAt: 456
  // })
})

server.listen(port, () => {
  console.log(`Server is running port ${port}`);
})