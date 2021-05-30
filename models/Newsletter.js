const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const newsletterSchema = new Schema({

    area:String,
    dia:String,
    mes:String,
    anio:String,
    titulo:String,
    html:String,
    path:String,
    fecha:String,

},{
    timestamps:true,
})


module.exports = model('Newsletter',newsletterSchema);