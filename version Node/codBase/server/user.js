'user strict'

const mongoose = require('mongoose');
const User = require('./userScheme.js')
const MSGS = require('./config.js')

function singUp(req, res) {
  let user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    birthday: req.body.birthday
  })

  user.save((err, userStored)=>{
    if(err){
      res.status(500).send({msg: 'Error al ingresar un nuevo usuario... '+err})
    }else{
      res.status(200).send({
        msg: MSGS.msg_login.ok,
        user: userStored
      })
    }
  })
}

function login(req, res) {
  let logEmail = req.body.email;
  let logPassword = req.body.password;

  User.find({email: logEmail, password: logPassword}, (err, user)=>{
    if(err){
      return res.status(500).send({msg: 'Error al realizar la peticion: '+err})
    }
    if(user[0] == null){
      return res.status(404).send({msg: MSGS.msg_login.incorrect})
    }else{
      res.status(200).send({msg: MSGS.msg_login.ok, user: user})
    }
  })
}

function firstUser(req, res) {
    let user = new User({
      name: 'user',
      password: '1234',
      email: 'user@gmail.com',
      birthday: '13-04-2020'
    })

    User.find({name: 'user', password: '1234', email: 'user@gmail.com', birthday: '13-04-2020'}, (err, newUser)=>{
      if(err){
          return res.status(500).send({msg: 'Error al realizar la peticion: '+err})
      }
      if(newUser[0] == null){
          user.save((err, userStored)=>{
              if(err){
                res.status(500).send({msg: 'Error al ingresar un nuevo usuario... '+err})
              }else{
                res.status(200).send({
                  msg: MSGS.msg_login.new,
                  user: userStored
                })
              }
          })
      }else{
          res.status(200).send({msg: 'El usuario ya existe.', user: user})
      }
    })
}

module.exports = {
  firstUser,
  singUp,
  login
}
