const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    nombre:String,
    apellido:String,
    rut:String,
    email:{
        type: String,
        required: true
    },
    direccion:String,
    telefono:String,
    password:{
        type: String,
        required: true
    },
    hashpassword:{
        type: String,
        required: true
    },
    resetPasswordLink:{
        type:String,
        default: ''
    },
    avatar:String,
    rol:Number,
    razonsocial:String,
    numerodecontrato:String,
    fechainicio:String,
    fechavencimiento:String,
    descripcion:String,
    conexiones: Object,
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