var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(typeof(message.createdAt)).toEqual('number');
    expect(message).toMatchObject({from, text})

  });
})
// Testeo para la geolocalizacion
describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Dave';
    var latitude = 15;
    var longitude = 23;
    var url = 'https://www.google.com/maps?q=15,23';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(typeof(message.createdAt)).toEqual('number');
    expect(message).toMatchObject({from, url})
  })
});