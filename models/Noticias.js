const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const NoticiasSchema = new Schema({

    tipo:String,
    autor:String,
    titulo:String,
    categoria:String,
    portada:String,
    tags:Array,
    tags1:Array,
    resumen:String,
    contenido:String,
    visitas:Number,
    estado:Boolean,
    fechaEdicion:Date,
    fechaSubida:String,
    fechaFormateada:String,

},{
    timestamps:true,
})


module.exports = model('Noticias',NoticiasSchema);