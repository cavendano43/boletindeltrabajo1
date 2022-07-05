const { Schema, model } = require('mongoose');

const newsletterSchema = new Schema({
    area:String,
    dia:String,
    mes:String,
    anio:String,
    titulo:String,
    html:String,
    url:String,
    fecha:String,
},{
    timestamps:true,
})


module.exports = model('Newsletter',newsletterSchema);