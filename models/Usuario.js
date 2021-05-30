const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const usuarioSchema = new Schema({
    
    nombre:String,
    apellido:String,
    rut:String,
    email:Array,
    direccion:String,
    telefono:String,
    password:String,
    avatar:String,
    rol:Number,
    razonsocial:String,
    numerodecontrado:String,
    fechainicio:String,
    fechavencimiento:String,
    descripcion:String,
    inicioconexion:String,
    ultimaconexion:String,
    conexion:Boolean,
    visitas:Number,
    notificacion:Number,
    estado:Boolean,
    ultimaip:String,
    cookie:String,


},{
    timestamps:true,
})


module.exports = model('Usuario',usuarioSchema);