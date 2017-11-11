var socket = io();

socket.on('connect', function () {
  console.log('Connected to server')
});

// ---- from server to client ----
socket.on('disconnect', function () {
  console.log('Disconnected from server')
});
// Recibimos un evento(newEmail) y le mandamos
// un parametro a la funcion, la cual trae
// la informacion del server, un objeto.
socket.on('newEmail', function (email) {
  console.log('New Email', email);
});
socket.on('newMessage', function (message){
  console.log('Got new message', message)
})

// ---- from client to server ----
// Emitimos el evento al servidor y le 
// pasamos el objeto como parametro
socket.emit('createEmail', {
  to: 'jen@example.com',
  text: 'Hey. This is Andrew.'
})

socket.emit('createMessage', {
  from: 'yolo@example.com',
  text: 'Something here'
})