const {generarPDF} = require('../helpers/HTML-pdf');
const {modeloCartaAviso,modeloFiniquito,modeloCalculo} = require('../helpers/Finiquito');


class FiniquitoController {
    
    static async cartaAviso (req,res){
        const body=req.body;
        const html=modeloCartaAviso(body);
        const filename=`carta-aviso-${Date.now()}.pdf`;
        const name=`../frontend/src/assets/storage/finiquito/${filename}`;
        const pdf=`assets/storage/finiquito/${filename}`;
        generarPDF(html,filename);

        res.json({"res":true,"url":"https://grupoboletindeltrabajo.s3.amazonaws.com/assets/"+filename});
    }

    static async finiquito (req,res){
        const body=req.body;
        const html=modeloFiniquito(body);
        const filename=`finiquito-${Date.now()}.pdf`;
        const name=`../frontend/src/assets/storage/finiquito/${filename}`;
        const pdf=`assets/storage/finiquito/${filename}`;
        generarPDF(html,filename);
        res.json({"res":true,"url":"https://grupoboletindeltrabajo.s3.amazonaws.com/assets/"+filename});
    }

    static async calculo (req,res){
        const body=req.body;
        const html=modeloCalculo(body);
        const filename=`calculos-${Date.now()}.pdf`;
        const name=`../frontend/src/assets/storage/finiquito/${filename}`;
        const pdf=`assets/storage/finiquito/${filename}`;
        generarPDF(html,filename);
        res.json({"res":true,"url":"https://grupoboletindeltrabajo.s3.amazonaws.com/assets/"+filename});
    }
}

module.exports = FiniquitoController;