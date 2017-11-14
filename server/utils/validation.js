// Funcion la cual valida que el str pasado sea
// de tipo 'string' y que no sea un string vacio
var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};