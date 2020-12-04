const Contenidos=require('../models/Contenidos');

class DocumentosController {

    static async documentos(req,res){
        const area=req.params.area.toLocaleUpperCase();
        const documentos=await Contenidos.find({area:area},{_id:1,area:1,tema:1,tipo:1,subtipo:1,titulo:1});
        res.json(documentos);
    }

    static async documentosdetalles (req,res){
        const id=req.params.id;
       
        const documentos=await Contenidos.findById(id);
        
        if(documentos){
            return res.status(200).json(documentos);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]});
        }
    }
}


module.exports = DocumentosController