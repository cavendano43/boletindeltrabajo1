const {generarPDF} = require('../helpers/HTML-pdf');
const {modeloFiniquito,modeloCalculo} = require('../helpers/Finiquito');

//res.json({"res":true,"url":"https://grupoboletindeltrabajo.s3.amazonaws.com/assets/storage/finiquito/"+filename});
class FiniquitoController {
    
    /*static async cartaAviso (req,res){
        try{
            const body=req.body;
            const html=modeloCartaAviso(body);
            const filename=`carta-aviso-${Date.now()}.pdf`;
            const pdf=`https://portaldesoluciones.cl/assest/storage/finiquito/${filename}`;
            const response = await generarPDF(html,filename);
            console.log(response);
            res.json({code:200,"status":true,"url":pdf});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }*/

    static async finiquito (req,res){
        try{
            const body=req.body;
            const html=modeloFiniquito(body);
            const filename=`finiquito-${Date.now()}.pdf`;
            const pdf=`https://portaldesoluciones.cl/assest/storage/finiquito/${filename}`;
            const response = await generarPDF(html,filename);
            console.log(response);
            res.json({code:200,"status":true,"url":pdf});
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
            const response = await generarPDF(html,filename);
            console.log(response);
            res.json({code:200,"status":true,"url":pdf});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
}

module.exports = FiniquitoController;