// En este archivo declaramos una variable
// la cual recibe una funcion que se encargara
// de generar un mensaje pasnadole los parametros
// requeridos por dicha funcion.
var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

module.exports = {generateMessage};