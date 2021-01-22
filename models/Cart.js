const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const CartSchema = new Schema({
    id:String,
    items:Array,
    total:Number,
    totalformateado:String,
    cantidad:Number,
},{
    timestamps:true,
})

module.exports = model('Cart',CartSchema);