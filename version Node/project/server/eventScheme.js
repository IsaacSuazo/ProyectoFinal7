'use strict'

const mongoose = require('mongoose')
const Scheme = mongoose.Schema

const EventsScheme = Scheme({
  title: String,
  start: String,
  hour_start: String,
  end: String,
  hour_end: String,
  all_day: Boolean,
  fk_user: String
})

module.exports = mongoose.model('event', EventsScheme)
