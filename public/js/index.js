const rooms = ['General', 'Node Course', 'React Course'];

rooms.forEach(function (room) {
  const option = `<option value="${room}"></option>`;
  jQuery('#rooms').append(option);
});