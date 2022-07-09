const { Schema, model } = require('mongoose');


const FeriadoLegalchema = new Schema({

    nombre:String,
    comentario:String,
    fecha:String,
    irrenunciable:Boolean,
    tipo:String,
    leyes:Array
},{
    timestamps:true,
})


module.exports = model('FeriadoLegal',FeriadoLegalchema);