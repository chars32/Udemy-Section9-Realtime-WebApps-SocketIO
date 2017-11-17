const expect = require('expect');

const {Users} = require('./users');

// Pruebas al users.js
describe('Users', () => {

  var users;
  // cada que empezamos una prueba se
  // crear una instancia de la clase Users
  beforeEach(() => {
    users = new Users();
    // usamos users.users ya que el primer users
    // se refiere a la instancia y el segundo apunta
    // users del constructor de la clase.
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }]
  })

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Andrew',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '3';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userId = '55';
    var user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  })

  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '99'
    var user = users.getUser(userId)

    expect(user).toBeFalsy();
  })

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Julie']);
  })
  // test para checar que el nombre del usuario no este repetido
  it('should find name repeat', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toContain('Mike');

  })
});