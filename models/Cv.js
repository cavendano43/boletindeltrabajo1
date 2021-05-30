const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');




const CvSchema = new Schema({

    nombre:String,
    email:String,
    telefono:String,
    areas:Array,
    cv:String,
    mensaje:String,

},{
    timestamps:true,
})

CvSchema.methods.setCv = function setCv(filename){
    const host='http://localhost'
    const port='3000'
    this.cv = `${host}:${port}/public/cv/${filename}`
}


module.exports = model('Cv',CvSchema);