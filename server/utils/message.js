var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    // cambiamos para obtener los segundos con moment
    createdAt: moment().valueOf()
  };
};
// nueva funcion para generar la url
var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};