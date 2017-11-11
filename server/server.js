// Instanciamos el buit-in module path,
// no se instala, viene con nodejs
const path = require('path');

// Hacemos uso de path y uniremos la ruta del archivo
// y que suba (..) al archivo public.
const publicPath = path.join(__dirname, '../public');

// Declaramos el port para Heroku
const port = process.env.PORT || 3000;

// Llamamos e instanciamos express
const express = require('express');
const app = express();

// Middleware para que express use la carpeta public
// contenida en la const publicPath
app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log(`Server is running port ${port}`);
})

// Esta es la version sin paquete 'path'
// console.log(__dirname + './../public');
// // Esta es la version con el paquete 'path'
// console.log(publicPath);

// setup express locally
// create a brand new express aplication
// configure express static middleware to serve public
// app.listen = 3000, print 'app is run in port 3000' 