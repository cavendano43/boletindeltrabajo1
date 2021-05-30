const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const CalendarioSchema = new Schema({
    
    previewImageSrc:String,
    thumbnailImageSrc:String,
    alt:String,
    title:String,
    fecha:String,

},{
    timestamps:true,
})


module.exports = model('Calendario',CalendarioSchema);