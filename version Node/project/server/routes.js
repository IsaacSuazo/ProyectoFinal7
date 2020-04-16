'use strict'

const express = require('express');
const api = express.Router();
//para los eventos
const EventsCtrl = require('./event.js');
//para el login
const UserCtrl = require('./user.js')

/*
* Rutas para los eventos.
*/
//Ruta para obtener todos los eventos.
api.get('/events/all', EventsCtrl.getEvents)
//Ruta para obtener los eventos por email.
api.post('/events/find', EventsCtrl.getEventById)
//Ruta para ingresar un evento a la base de datos.
api.post('/events/new', EventsCtrl.newEvent)
//Ruta para borrar un evento de la base de datos.
api.post('/events/delete', EventsCtrl.deleteEvent)
//Ruta para actualizar los eventos.
api.post('/events/update', EventsCtrl.updateEvent)

/*
* Rutas para el login.
*/
//Ruta para ingresar un usuario a la base de datos.
api.post('/user/singup', UserCtrl.singUp)
//Ruta para validar los usuarios.
api.post('/user/login', UserCtrl.login)
//Ruta para crear el primer usuario.
api.get('/user/firstuser', UserCtrl.firstUser)

module.exports = api
