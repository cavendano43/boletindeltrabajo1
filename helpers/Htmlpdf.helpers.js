const pdf = require('html-pdf');
//const {FileUploadS3} = require('./AWS-Helper.js');
const axios = require("axios");
exports.generarPDF = async(html,name)=>{
    try{
        const file=`../frontend/src/assets/storage/finiquito/${name}`;
    
        let response;
        if(process.env.AMBIENT === 'QA'){
            response = pdf.create(html).toFile(file, function(err, resp) {
                try{
                    if (err) return console.log(err);
                    return resp;
                }catch(e){
                    return e;
                }
            });
  
        } else {
            response = await pdf.create(html).toBuffer(async function(err, buffer){
                try{
                    const string64 = buffer.toString('base64');
                    const resp =  await axios.post(`${process.env.API_PORTAL_FINIQUITO}`, {
                        buffer:string64,
                        name:name,
                    });
                    return resp.data;
                } catch(e) {
                    return e;
                }
                //return FileUploadS3(buffer,name);
            });
        }
        
    } catch(e) {
        return e;
    } 
}