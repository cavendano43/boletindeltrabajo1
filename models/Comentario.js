const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const ComentarioSchema = new Schema({
    
    id:String,
    tipo:String,
    nombre:String,
    email:String,
    avatar:String,
    comentario:String,
    reply:Array,
    fecha:Date,

},{
    timestamps:true,
})


module.exports = model('Comentario',ComentarioSchema);