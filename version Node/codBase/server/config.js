module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://localhost:27017/project7',

  //mensajes de los eventos.
  msg_events: {
    new_event: 'Evento creado exitosamente',
    all_events: 'Todos los eventos',
    find_event: 'Evento encontrado exitosamente',
    update_event: 'Evento actualizado exitosamente',
    delete_event: 'Evento eliminado exitosamente',
    not_found: 'No existe'
  },

  fk_user: 'user@gmail.com',

  //mensajes para el login
  msg_login: {
    new: 'Priner usuario creado',
    ok: 'OK',
    incorrect: 'Usuario o contraseña incorrectos'
  }
}
