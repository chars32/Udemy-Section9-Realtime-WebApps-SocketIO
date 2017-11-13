var socket = io();

socket.on('connect', function () {
  console.log('Connected to server')
});

// ---- from server to client ----
socket.on('disconnect', function () {
  console.log('Disconnected from server')
});

socket.on('newMessage', function (message){
  // creamos una variable para recibir el createdAt y darle
  // formato con momentjs
  var formattedTime = moment(message.createdAt).format('h:mm a')
  console.log('Got new message', message)
  var li = jQuery('<li></li>');
  // lo agregamos a nuestro li
  li.text(`${message.from}: ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
})

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: ${formattedTime} `);
  a.attr('href', message.url);
  li.append(a);

  jQuery('#messages').append(li);
});

// ---- from client to server ----
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  // debido a que el valor se repite creamos esta variable
  var messageTextBox = jQuery('[name=message')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    // con este callback dejamos en blanco el input
    messageTextBox.val('')
  })
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  // cuando este buscando la location cambia el texto y se deshabilita
  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function (position) {
    // cambia el texto y se habilita
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    // cambia el texto y se habilita
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location')
  })
});