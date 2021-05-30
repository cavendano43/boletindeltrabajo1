const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const contenidoSchema = new Schema({
    id:Number,
    categoria:String,
    area:String,
    tema:String,
    tipo:String,
    subtipo:Array,
    contenido:String,
    descripcion:String,
    titulo:String,
    portada:String,
    documento:Array,
    video:String,
    audio:String,
    issuu:String,
    embed:String,
    link:String,
    relaciones:Array,
    tags:Array,
    visitas:Number,
    estado:Boolean,
    fechaSubida:String
},{
    timestamps:true,
})


module.exports = model('Contenido',contenidoSchema);