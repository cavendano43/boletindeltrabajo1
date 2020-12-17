const Noticias=require('../models/Noticias');

class NoticiasController{
   
    static noticiasUltima = async(req,res)=>{
        const noticias= await Noticias.find().sort({fechaEdicion:-1}).limit(3);

        if(noticias){
            return res.json(noticias)
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }
    }

    static noticiasDetalles = async(req,res)=>{
        const id=req.params.id;

        const noticias = await Noticias.findById(id);
    
        const resp=await Noticias.findByIdAndUpdate(id,{ $inc: {visitas:1}});
        
        if(noticias){
            return res.json(noticias)
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }
    
    }

    static noticiasAreas = async(req,res)=>{
        const area=req.params.area;
        let noticias;
        
        if(area=="all"){
            noticias= await Noticias.find({},{_id:1,titulo:1,categoria:1,resumen:1,portada:1,autor:1,tags:1,tags1:1,fechaSubida:1,fechaFormateada:1});
        }else{
            noticias= await Noticias.find({categoria:area},{_id:1,titulo:1,categoria:1,resumen:1,portada:1,autor:1,tags:1,tags1:1,fechaSubida:1,fechaFormateada:1});
        }
        
        if(noticias){
            return res.json(noticias)
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }
    }
}
module.exports = NoticiasController;