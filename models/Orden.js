const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');
const OrdenSchema = new Schema({
    id:String,
    token:String,
    user:Array,
    items:Array,
    transactions:Array,
    total:Number,
    totalformateado:String,
    cantidad:Number,
},{
    timestamps:true,
})

module.exports = model('Orden',OrdenSchema);