const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const userSchema = new Schema({

    email:String,
    password:String

},{
    timestamps:true,
})


module.exports = model('User',userSchema);