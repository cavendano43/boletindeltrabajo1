////////////////////////// models ////////////////////////////
const Usuario=require('../models/Usuario');
const Comentario=require('../models/Comentario');
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
            noticias= await Noticias.find({},{_id:1,titulo:1,categoria:1,resumen:1,portada:1,autor:1,tags:1,tags1:1,fechaSubida:1,fechaFormateada:1}).sort({fechaEdicion:-1});
        }else{
            noticias= await Noticias.find({categoria:area},{_id:1,titulo:1,categoria:1,resumen:1,portada:1,autor:1,tags:1,tags1:1,fechaSubida:1,fechaFormateada:1}).sort({fechaEdicion:-1});
        }
        
        if(noticias){
            return res.json(noticias)
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }
    }

    static getComentario = async(req,res)=>{
        const id=req.params.id;

        const comentario= await Comentario.find({id:id});
       
        if(comentario){
            return res.json(comentario)
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }
    }

    static postComentario = async(req,res)=>{
        let avat;
        let usuario= await Usuario.findOne({email:{$elemMatch:{email:req.body.email}}},{avatar:1,_id:1});
      
        if(usuario){
            avat=`https://portaldesoluciones.cl/${usuario.avatar}`
        }else{
            avat='assets/images/avatar/user_icon.png';
        }
 
        
        let comment={
    
            "id":req.body.id,
            "nombre":req.body.nombre,
            "email":req.body.email,
            "avatar":avat,
            "comentario":req.body.comentario,
            "tipo":req.body.tipo,
            "reply":req.body.reply,
            "fecha":req.body.fecha,
            "fechaformateada":fechaformateada(req.body.fecha,"ll")
        }
        
        let comentarioModel=new Comentario(comment);
        const resp=await comentarioModel.save(); 
        
        return res.status(201).json({"res":true,data:resp});
    }
    static putReplyComentario = async(req,res)=>{
        let avat;
        const id=req.body.id;
        let usuario= await Usuario.findOne({email:{$elemMatch:{email:req.body.email}}},{avatar:1,_id:1});
      
        if(usuario){
            avat=`https://portaldesoluciones.cl/${usuario.avatar}`
        }else{
            avat='assets/images/avatar/user_icon.png';
        }

        let comentario=await Comentario.findById(id);
        
        let reply=comentario.reply;
        let comment={
            "id":req.body.id,
            "nombre":req.body.nombre,
            "email":req.body.email,
            "avatar":avat,
            "comentario":req.body.comentario,
            "reply":req.body.reply,
            "fecha":req.body.fecha,
            "fechaformateada":fechaformateada(req.body.fecha,"ll")
        }
        reply.push(comment);
        comentario.reply=reply;
        const data=await Comentario.findByIdAndUpdate(id,{ reply });
        res.status(200).json({"res":true,"data":data});
    }
}
module.exports = NoticiasController;