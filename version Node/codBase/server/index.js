'user strict'
const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Routes = require('./routes.js')
const config = require('./config.js')

const app = express();
const Server = http.createServer(app);
//abrimos la conexion de mongoose
mongoose.connect(config.db, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Conexion a la base de datos establesida...');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

app.use(express.static('../client'));
app.use('/api', Routes);

Server.listen(config.port, ()=>{
  console.log('La pagina esta corriendo en el puerto: '+config.port)
})
