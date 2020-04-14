'use strict'

const Events = require('./eventScheme.js')
const MSGS = require('./config.js')

//Para ingresar un evento a la base de datos.
function newEvent(req, res) {
  console.log('POST /events/new')
  console.log(req.body)

  let evento = new Events()
  evento.title = req.body.title
  evento.start = req.body.start
  evento.hour_start = req.body.hour_start
  evento.end = req.body.end
  evento.hour_end = req.body.hour_end
  evento.all_day = req.body.all_day
  evento.fk_user = MSGS.fk_user

  evento.save((err, eventoStored)=>{
    if(err){
      res.status(500).send({msg: 'Error al ingresar un nuevo evento... '+err})
    }else{
      res.status(200).send({
        msg: MSGS.msg_events.new_event,
        event: eventoStored
      })
    }
  })
}

//Para obtener todos los eventos.
function getEvents(req, res) {
  Events.find({fk_user: 'user@gmail.com'}, (err, eventos)=>{
    if(err){
      return res.status(500).send({msg: 'Error al realizar la peticion: '+err})
    }
    if(eventos[0] == null){
      return res.status(404).send({msg: MSGS.msg_events.not_found})
    }else{
      //res.send(200, {eventos})
      res.status(200).send({msg: MSGS.msg_events.all_events, events: eventos})
    }
  })
}

//Para obtener los eventos por email.
function getEventById(req, res) {
  let id = req.body.id

  Events.find({_id: id}, (err, evento)=>{
    if(err){
      return res.status(500).send({msg: 'Error al realizar la peticion: '+err})
    }
    if(evento[0] == null){
      return res.status(404).send({msg: MSGS.msg_events.not_found})
    }else{
      res.status(200).send({msg: MSGS.msg_events.find_event, event: evento})
    }
  })
}

//Para borrar un evento de la base de datos.
function deleteEvent(req, res) {
  let eventId = req.body.id
  Events.findById(eventId, (err, evento)=>{
    if(err){
      res.status(500).send({msg: 'Error al borrar el evento... '+err})
    }else{
      evento.remove(err =>{
        if(err){
          res.status(500).send({msg: 'Error al Error al borrar el evento... '+err})
        }else{
          res.status(200).send({msg: MSGS.msg_events.delete_event})
        }
      })
    }
  })
}

//Para actualizar los eventos.
function updateEvent(req, res) {
  let eventId = req.body.id
  let eventUpdate = req.body
  Events.findByIdAndUpdate(eventId, eventUpdate, (err, eventUpdated)=>{
    if(err){
      res.status(500).send({msg: 'Error al actualizar el evento: '+err})
    }else{
      res.status(200).send({msg: MSGS.msg_events.update_event, event: eventUpdated})
    }
  })
}

module.exports = {
  getEvents,
  getEventById,
  newEvent,
  deleteEvent,
  updateEvent
}
