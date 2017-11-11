var socket = io();

socket.on('connect', function () {
  console.log('Connected to server')
});

// ---- from server to client ----
socket.on('disconnect', function () {
  console.log('Disconnected from server')
});

socket.on('newMessage', function (message){
  console.log('Got new message', message)
})

// ---- from client to server ----
// socket.emit('createMessage', {
//   from: 'yolo@example.com',
//   text: 'Something here'
// })