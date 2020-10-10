import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
/*
app.get('/', (req, res) => {
  res.send('Hello World!');
});
*/
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port'+ app.get('puerto'));
});

/*


const express = require('express');
const cors = require('cors');
//Nos sirve para pintar las peticiones HTTP request que se solicitan a nuestro aplicación
const morgan = require('morgan');
// Para acceder al directorio actual
const path = require('path');

const app = express();


// Middleware
app.use(morgan('tiny'));
// El cross-origin resource sharing permite realizar conexiones con servidores ajenos, algo prohibido
app.use(cors());
app.use(express.json());
//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// Rutas
app.get('/', function (req, res) {
    res.send('Hello World!');
});


// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));


//puerto por el que corre la app
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
  console.log('Example app listening on port'+ app.get('puerto'));
});
*/