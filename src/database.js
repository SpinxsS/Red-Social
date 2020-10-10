const mongose = require('mongoose');

const { database } = require('./keys');

mongose.connect(database.URI, {
    useNewUrlParser : true
})   
    .then(db => console.log('conexion con base de datos correcta'))
    .catch(err => console.error(err));