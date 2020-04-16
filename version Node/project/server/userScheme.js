'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const bcrypt = require('bcrypt-nodejs')

const UserSchema = Schema({
  name: String,
  password: { type: String, select: false },
  email: { type: String, unique: true, lowercase: true },
  birthday: String
})
/*
LoginSchema.pre('save', (next)=>{
  let user = this
  if(!user.isModified('contrasena')) return next()

  bcrypt.genSalt(10, (err, salt)=>{
    if(err) return next(err)

    bcrypt.hash(user.contrasena, salt, null, (err, hash)=>{
      if(err) return next(err)

      user.contrasena = hash
      next()
    })
  })
})
*/
module.exports = mongoose.model('user', UserSchema)
