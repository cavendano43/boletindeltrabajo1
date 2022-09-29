const pdf = require('html-pdf');
//const {FileUploadS3} = require('./AWS-Helper.js');
const axios = require("axios");
const { logger } = require('../config/pino');
exports.generarPDF = async(html,name)=>{
    
    try{
        logger.info(`[generarPDF] inicio`);
        const file=`../frontend/src/assets/storage/finiquito/${name}`;
        const url = process.env.API_PORTAL_FINIQUITO;
        logger.info(`[generarPDF] url ${url}`);
        logger.info(`[generarPDF] html: ${html}`);
        logger.info(`[generarPDF] name: ${name}`)
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
                    const resp =  await axios.post(url, {
                        buffer:string64,
                        name:name,
                    });
                    logger.info(`[generarPDF] response: ${JSON.stringify(resp)}`);
                    return resp.data;
                } catch(e) {
                    logger.info(`[generarPDF] error: ${JSON.stringify(e)}`);
                    return e;
                }
                //return FileUploadS3(buffer,name);
            });
        }
        
    } catch(e) {
        return e;
    } 
}