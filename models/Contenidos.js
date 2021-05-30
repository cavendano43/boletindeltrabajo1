const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const ContenidosSchema = new Schema({
    
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
    estado:Boolean,
    visitas:Number,
    fechaSubida:String,
    fechaContenido:String,

},{
    timestamps:true,
})


module.exports = model('Contenidos',ContenidosSchema);