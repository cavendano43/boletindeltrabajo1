const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');



const UsuarioNewsletterSchema = new Schema({
    
    email:String,

},{
    timestamps:true,
})


module.exports = model('UsuarioNewsletter',UsuarioNewsletterSchema);