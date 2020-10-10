const mongose = require('mongoose');
const { Schema } = mongose;
const path = require('path');

const imageSchema =  new Schema ({
    title: { type: String },
    description : { type: String },
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }

});

//variable virtual que no se almacena en la db, sino que se ejecuta cada vez que se llama al esquema
imageSchema.virtual('uniqueId')
 .get(function() {
     return this.filename.replace(path.extname(this.filename), '');
 });

module.exports = mongose.model('image', imageSchema);