const {generarPDF} = require('../helpers/Htmlpdf.helpers');
const {modeloCartaAviso,modeloCartaAviso2,modeloFiniquito,modeloFiniquito2,modeloCalculo} = require('../helpers/Finiquito.helper');
const axios = require("axios");
//res.json({"res":true,"url":"https://grupoboletindeltrabajo.s3.amazonaws.com/assets/storage/finiquito/"+filename});
const { logger } = require('../config/pino');
class FiniquitoController {
    
    static async cartaAviso (req,res){
        try{
            logger.info(`[FiniquitoController] cartaAviso inicio`);
            const body=req.body;
            logger.info(`[FiniquitoController] cartaAviso body ${JSON.stringify(body)}}`);
            const html=modeloCartaAviso2(body);
            const filename=`carta-aviso-${Date.now()}.pdf`;
            //const pdf=`${process.env.API_PORTAL}assest/storage/finiquito/${filename}`;
            await generarPDF(html,filename,res);
            logger.info(`[FiniquitoController] cartaAviso response end`);
            //const response = {code:200,status:true,"url":pdf}
            //logger.info(`[FiniquitoController] cartaAviso response ${JSON.stringify(response)}}`);
            //return response;
        }catch(e){
            const error = {code:404,status:false,message:"error del servidor",errors:e}
            logger.error(`[FiniquitoController] cartaAviso error ${JSON.stringify(error)}}`);
            return res.status(404).send(error);
        }
    }

    static async finiquito (req,res){
        try{
            logger.info(`[FiniquitoController] finiquito inicio`);
            const body=req.body;
            logger.info(`[FiniquitoController] finiquito body ${JSON.stringify(body)}}`);
            const html=modeloFiniquito2(body);
            const filename=`finiquito-${Date.now()}.pdf`;
            //const pdf=`${process.env.API_PORTAL}assest/storage/finiquito/${filename}`;
            await generarPDF(html,filename,res);
            logger.info(`[FiniquitoController] finiquito end`);
            //const response = {code:200,status:true,"url":pdf}
            //logger.info(`[FiniquitoController] finiquito response ${JSON.stringify(response)}}`);
            //res.json(response);
        }catch(e){
            const error = {code:404,sttus:false,message:"error del servidor",errors:e}
            logger.error(`[FiniquitoController] finiquito error ${JSON.stringify(error)}}`);
            return res.status(404).send(error);
        }
    }

    static async calculo (req,res){
        try{
            logger.info(`[FiniquitoController] calculo inicio`);
            const body=req.body;
            logger.info(`[FiniquitoController] calculo body ${JSON.stringify(body)}}`);
            const html=modeloCalculo(body);
            const filename=`calculos-${Date.now()}.pdf`;
            //const pdf=`${process.env.API_PORTAL}assest/storage/finiquito/${filename}`;
            await generarPDF(html,filename,res);
            logger.info(`[FiniquitoController] calculo end`);
            //logger.info(`[FiniquitoController] calculo buffer ${buffer}}`);
            //res.json({code:200,status:true,"url":pdf});
        }catch(e){
            const error = {code:404,status:false,message:"error del servidor",errors:e}
            logger.error(`[FiniquitoController] calculo error ${JSON.stringify(error)}}`);
            return res.status(404).send(error);
        }
    }

    static async feriadoLegal(req,res) {
        try{
            logger.info(`[FiniquitoController] feriadoLegal inicio`);
            const { data } = await axios.post('https://apis.digital.gob.cl/fl/feriados');
            return res.status(200).json({code:200,status:true,payload:data});
        } catch(e){
            const error = {code:404,status:false,message:"error del servidor",errors:e}
            logger.error(`[FiniquitoController] feriadoLegal error ${JSON.stringify(error)}}`);
            return res.status(404).send(error);
        }
    }
}

module.exports = FiniquitoController;