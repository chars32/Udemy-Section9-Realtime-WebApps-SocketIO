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
socket.emit('createMessage', {
  from: 'Frank',
  text: 'Something here'
  // pasamos una funcion como tercer
  // parametro en el emit(callback)
  // la data es el texto que manda el callback
  // desde el server, es decir la respuesta de 
  // regreso del servidor. 
}, function(data) {
  console.log('Got it', data);
});