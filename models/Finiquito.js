const { Schema, model } = require('mongoose');

const finiquitoSchema = new Schema({
    name:String,
    url:String
},{
    timestamps:true,
})


module.exports = model('Finiquito',finiquitoSchema);