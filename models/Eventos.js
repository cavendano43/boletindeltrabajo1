const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const eventosSchema = new Schema({

    id:String,
    title:String,
    modalidad:String,
    ubicacion:String,
    start:Date,
    end:Date,
    color:String,
    description:String,

},{
    timestamps:true,
})


module.exports = model('Eventos',eventosSchema);