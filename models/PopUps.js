const { Schema, model } = require('mongoose');




const popupsSchema = new Schema({

    titulo:String,
    enlace:String,
    contenido:String,
    background:String,
    orden:Number,
    imgpopups:String,
    estado:Boolean

},{
    timestamps:true,
})


module.exports = model('Popups',popupsSchema);