const path = require('path');
const exhbs = require('express-handlebars');
const Handlebars = require('handlebars')
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');
const routes = require('../routes/index');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');


module.exports = app => {

    //settings
    app.set('port' , process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exhbs({
        defaultLayout :'main',
        partialsDir : path.join(app.get('views'), 'partials'),
        layoutsDir : path.join(app.get('views'), 'layouts'),
        extname : '.hbs',
        helpers : require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));

    app.set('view engine', '.hbs');

    //middlewares
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended: false})); 
    //manejo de likes con ajax
    app.use(express.json());








    //routes 
    routes(app);

    // archivos estaticos

    app.use('/public', express.static(path.join(__dirname, '../public')));
    //errohandlers -para saber en que entorno estoy
   if ( 'development' === app.get('env')){
       app.use(errorHandler);
   }


    return app;
}