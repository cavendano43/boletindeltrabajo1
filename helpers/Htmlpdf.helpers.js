const pdf = require('html-pdf');
const pdf_html = require('html-pdf-node');
const options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'],margin:{top:34,bottom:34} };
//const {FileUploadS3} = require('./AWS-Helper.js');
const axios = require("axios");
const { logger } = require('../config/pino');

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
            const file = { content: html};
            response = pdf_html.generatePdf(file, options).then(async buffer => {

                try{
                    const string64 = buffer.toString('base64');
                    // const resp =  await axios.post(url, {
                    //     buffer:string64,
                    //     name:name,
                    // });
                    
                    logger.info(`[generarPDF] response portaldesoluciones: ${JSON.stringify(string64)}`);
                    const resp = {
                        code:200,
                        message:"finiquito generado",
                        url:string64
                    }
                    const responsep = await res.status(200).json(resp);
                    return responsep;
                } catch(e) {
                    logger.info(`[generarPDF] error portaldesoluciones: ${JSON.stringify(e)}`);
                    return res.status(404).json({"error":e});
                }
            });
            /*response = await pdf.create(html).toBuffer(async (err, buffer)=>{
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
            });*/
        }
        console.log(response);
     
    } catch(e) {
        console.log(e);
        return e;
    } 
}