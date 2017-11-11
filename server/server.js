const path = require('path');
const publicPath = path.join(__dirname, '../public');
// Llammaos a http para poder crear un server
// este viene con nodejs
const http = require('http');
// Llamamos a socketIO
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const express = require('express');
const app = express();
// Creamos el server utilizando 
// http.createServer y le pasamos
// la app (express)
var server = http.createServer(app);
// Aqui a socketIO le pasamos el server,
// este es el motivo por el cual usamos 
// http. Asi ya podremos usar socketIO
// en nuestro server.
var io = socketIO(server);

app.use(express.static(publicPath));
// io.on sirve para escuchar un evento,
// en este caso connection el cual espera
// por una conexion y cuando recibe
// el socket manda el mensaje. El socket 
// es la conexión individual que cada 
// cliente hace al server.
io.on('connection', (socket) => {
  console.log('New user connection')
  // Le pasamos al socket que espere un evento
  // disconnect, el cual indica que la pagina
  // web ha sido cerrada
  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})
// Cambiamos a server en lugar de app
// ya que le pasamos la app. FUncionan
// de la misma manera.
server.listen(port, () => {
  console.log(`Server is running port ${port}`);
})