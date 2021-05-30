const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const sliderSchema = new Schema({

    area:String,
    posicioncaption:String,
    animacion:String,
    titulo:String,
    bgtitulo:String,
    colortitulo:String,
    link:String,
    descripcion:String,
    bgdescripcion:String,
    colordescripcion:String,
    animaciondescripcion:String,
    titulobtn:String,
    bgbtn:String,
    colorbtn:String,
    animacionbtn:String,
    estado:Boolean,
    orden:Number,
    slider:String,

},{
    timestamps:true,
})


module.exports = model('Slider',sliderSchema);