// Aqui crearemos la clase Users con ES6, la cual contendra
// un objeto con los usuarios que entren al room, aqui tambien
// definiremos los metodos para agregar, eliminar, obtener 1 y 
// obtener una lista de usuarios.

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
  // Checa que el name de usuario no este repetido
  checkUser (userName, room) {
    var userList = this.getUserList(room)
    
    for (let name  of userList) {
      if (name === userName) {
        return true
      }
    }

  }
}

module.exports = {Users};