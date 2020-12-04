const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const CursosSchema = new Schema({

    id:Number,
    areaempresa:String,
    area:String,
    tipo:String,
    tituloLargo:String,
    tituloCorto:String,
    duracion:String,
    horas:String,
    codigosence:String,
    modalidad:String,
    descripcion:String,
    fundamentacion:String,
    objetivogeneral:String,
    objetivoespecifico:String,
    metodologia:String,
    certificacion:String,
    relator:String,
    portada:String,
    temario:String,
    visita:Number,
    views:String,
    estado:Boolean,
    puntuacion:Number,
    puntuaciontotal:Number,
    modulos:Array,
    url:String,
    fecha:Date,
    precio:Number,

},{
    timestamps:true,
})

module.exports = model('Cursos',CursosSchema);