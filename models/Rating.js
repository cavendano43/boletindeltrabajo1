const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');





const ratingSchema = new Schema({

    id:String,
    tipo:String,
    nombre:String,
    email:String,
    titulo:String,
    comentario:String,
    recomendacion:String,
    rating:Number,

},{
    timestamps:true,
})


module.exports = model('Rating',ratingSchema);