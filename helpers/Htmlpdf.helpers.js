const pdf = require('html-pdf');
//const {FileUploadS3} = require('./AWS-Helper.js');
const axios = require("axios");
const { logger } = require('../config/pino');
const options={
    "phantomPath": "./node_modules/phantomjs/bin/phantomjs", 
}
exports.generarPDF = async(html,name,res)=>{
    
    try{
        logger.info(`[generarPDF] inicio`);
        const file=`../frontend/src/assets/storage/finiquito/${name}`;
        const url = process.env.API_PORTAL_FINIQUITO;
        logger.info(`[generarPDF] url ${url}`);
        //logger.info(`[generarPDF] html: ${html-pdfml}`);
        logger.info(`[generarPDF] name: ${name}`)
        let response;
        if(process.env.AMBIENT === 'QA'){
            response = await pdf.create(html).toFile(file, function(err, resp) {
                try{
                    if (err) return console.log(err);
                    return resp;
                }catch(e){
                    return e;
                }
            });
        } else {
            response = await pdf.create(html).toBuffer(async (err, buffer)=>{
                try{
                    const string64 = buffer.toString('base64');
                    const resp =  await axios.post(url, {
                        buffer:string64,
                        name:name,
                    });
                    
                    logger.info(`[generarPDF] response portaldesoluciones: ${JSON.stringify(resp.data)}`);
                    const responsep = await res.status(200).json(resp.data);
                    return responsep;
                } catch(e) {
                    logger.info(`[generarPDF] error portaldesoluciones: ${JSON.stringify(e)}`);
                    return res.status(404).json({"error":e});
                }
                //return FileUploadS3(buffer,name);
            });
        }
     
    } catch(e) {
        console.log(e);
        return e;
    } 
}