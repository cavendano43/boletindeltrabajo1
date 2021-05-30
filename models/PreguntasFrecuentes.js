const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const preguntasSchema = new Schema({

    tipo:String,
    tema:String,
    area:String,
    titulo:String,
    contenido:String,
    fecha:String,

},{
    timestamps:true,
})


module.exports = model('PreguntasFrecuentes',preguntasSchema);