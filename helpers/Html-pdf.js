var pdf = require('html-pdf');
const {FileUploadS3} = require('./AWS-Helper.js');

exports.generarPDF = async function (contenido,name){
    
    const respuesta= await pdf.create(contenido).toBuffer(async function(err, buffer){
        return FileUploadS3(buffer,name);
    });

    return respuesta;
 
}