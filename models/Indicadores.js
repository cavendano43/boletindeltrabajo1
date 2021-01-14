const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const indicadoresSchema = new Schema({

    tipo:String,
    dia:String,
    mes:String,
    anio:String,
    valor:String,
    valores:Array,
    fecha:String

},{
    timestamps:true,
})


module.exports = model('Indicadores',indicadoresSchema);