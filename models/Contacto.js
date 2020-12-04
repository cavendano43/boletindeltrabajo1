const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const ContactoSchema = new Schema({
    
    tipo:String,
    nombre:String,
    apellido:String,
    email:String,
    asunto:String,
    razonsocial:String,
    direccion:String,
    rut:String,
    telefono:String,
    area:String,
    mensaje:String,
    leido:Boolean,
    destacado:Boolean,

},{
    timestamps:true,
})


module.exports = model('Contacto',ContactoSchema);