const {generarPDF} = require('../helpers/Htmlpdf.helpers');
const {modeloCartaAviso,modeloCartaAviso2,modeloFiniquito,modeloFiniquito2,modeloCalculo} = require('../helpers/Finiquito.helper');
const axios = require("axios");
//res.json({"res":true,"url":"https://grupoboletindeltrabajo.s3.amazonaws.com/assets/storage/finiquito/"+filename});
class FiniquitoController {
    
    static async cartaAviso (req,res){
        try{
            const body=req.body;
            const html=modeloCartaAviso2(body);
            const filename=`carta-aviso-${Date.now()}.pdf`;
            const pdf=`https://portaldesoluciones.cl/assest/storage/finiquito/${filename}`;
            await generarPDF(html,filename);

            res.json({code:200,status:true,"url":pdf});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static async finiquito (req,res){
        try{
            const body=req.body;
            const html=modeloFiniquito2(body);
            const filename=`finiquito-${Date.now()}.pdf`;
            const pdf=`https://portaldesoluciones.cl/assest/storage/finiquito/${filename}`;
            await generarPDF(html,filename);
            res.json({code:200,status:true,"url":pdf});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static async calculo (req,res){
        try{
            const body=req.body;
            const html=modeloCalculo(body);
            const filename=`calculos-${Date.now()}.pdf`;
            const pdf=`https://portaldesoluciones.cl/assest/storage/finiquito/${filename}`;
            await generarPDF(html,filename);
            res.json({code:200,status:true,"url":pdf});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static async feriadoLegal(req,res) {
        try{
            const { data } = await axios.post('https://apis.digital.gob.cl/fl/feriados');
            return res.status(200).json({code:200,status:true,payload:data});
        } catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
}

module.exports = FiniquitoController;