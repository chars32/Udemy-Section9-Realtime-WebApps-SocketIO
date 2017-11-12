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
// escuchamos el newLocationMessage y usamos jquery
socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);

  jQuery('#messages').append(li);
});

// ---- from client to server ----
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {
    console.log('yeah')
  })
});
// obtenemos el #send-location y le agregamos el
// evento on le pasamos click y una funcion
var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  // navigator es un atributo que tienen los navegadores y mediante 
  // el podemos obtener la posicion actual, la cual recibe una 2 funciones
  // como parametro, una con los datos y otra por si falla
  navigator.geolocation.getCurrentPosition(function (position) {
    // emitimos el evento el cual pasara un objeto con los datos
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    // y aqui esta pro si falla
  }, function () {
    alert('Unable to fetch location')
  })
});