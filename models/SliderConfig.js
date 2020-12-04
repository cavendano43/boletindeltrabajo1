const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const sliderconfigSchema = new Schema({

    area:String,
    tiempo:Number,
    pausar:Boolean,
    repetir:Boolean,
    height:String,
    colorflechas:String,
    colorflechashover:String,


},{
    timestamps:true,
})


module.exports = model('SliderConfig',sliderconfigSchema);