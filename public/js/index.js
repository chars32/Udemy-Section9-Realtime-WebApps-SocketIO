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
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
})

// ---- from client to server ----
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Something here'
// }, function(data) {
//   console.log('Got it', data);
// });

//con jquery seleccionamos el form con el id
// #message-form y le pasamos el evento(.on)
// submit 
jQuery('#message-form').on('submit', function(e) {
  // cancelamos la accion por defecto
  // mandar el formulario via web
  e.preventDefault();
  // emitimos el evento createMessage pasandole
  // un objeto y sus datos.
  socket.emit('createMessage', {
    from: 'User',
    // el text lo vamos a obtener del input
    // en el form mediante el atributo name
    // todo esto con jquery
    text: jQuery('[name=message]').val()
    // le mandamos el callback, aunque no tenga nada
  }, function() {
    console.log('yeah')
  })
});