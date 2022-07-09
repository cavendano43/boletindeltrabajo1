var pdf = require('html-pdf');
const {FileUploadS3} = require('./AWS-Helper.js');

exports.generarPDF = async  (html,name)=>{
    try{
        const file=`../frontend/src/assets/storage/finiquito/${name}`;
        let response;
        if(process.env.AMBIENT === 'DEV'){
            response = pdf.create(html).toFile(file, function(err, res) {
                if (err) return console.log(err);
                console.log(res); // { filename: '/app/businesscard.pdf' }
                return res;
            });
        }else {
            response= await pdf.create(html).toBuffer(async function(err, buffer){
                return FileUploadS3(buffer,name);
            });
        }
    } catch(e) {
        return e;
    } 
}