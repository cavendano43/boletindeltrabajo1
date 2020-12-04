const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const regionSchema = new Schema({

    nombre:String,
    numero:String,
    numeroRomano:String,
    comunas:Array,


},{
    timestamps:true,
})


module.exports = model('Region',regionSchema);