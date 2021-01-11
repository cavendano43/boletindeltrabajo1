/////////// models //////////////////////////////////
const Calendario =require('../models/Calendario');
const Contacto =require('../models/Contacto');
const Cv=require('../models/Cv');
const PopUps =require('../models/PopUps');
const Slider =require('../models/Slider');
const PreguntasFrecuentes=require('../models/PreguntasFrecuentes');
const Region= require('../models/Region');
const Newsletter=require('../models/Newsletter');
const UsuarioNewsletter=require('../models/UsuarioNewsletter');
//////////////////// helpers ///////////////////////
const {enviarCorreo} = require('../helpers/Nodemailer');

class APIController{

    static Contacto = async(req,res)=>{
        let contacto={};
        if(req.body.apellidos){

            contacto.tipo="cursos";
            contacto.nombre=req.body.nombre;
            contacto.apellido=req.body.apellidos;
            contacto.email=req.body.correo;
            contacto.asunto="Interes diplomado"
            contacto.razonsocial=req.body.razonsocial;
            contacto.direccion=req.body.direccion;
            contacto.rut=req.body.rut;
            contacto.telefono=req.body.telefono;     
            contacto.mensaje=req.body.mensaje;
            contacto.leido=false;
            contacto.destacado=false;
    

        }else{
            const {nombre,email,asunto,telefono,mensaje} = req.body;
            contacto.tipo="contacto";
            contacto.nombre=nombre;
            contacto.email=email;
            contacto.asunto=asunto;
            contacto.telefono=telefono;
            contacto.mensaje=mensaje;
            contacto.leido=false;
            contacto.destacado=false;

        }
    
        let contactoModel = new Contacto(contacto);
        await contactoModel.save();
        enviarCorreo(contacto.email,contacto.nombre,contacto.asunto,contacto.telefono,contacto.mensaje);
        return res.json({"res":1});
    }

    static getCalendario = async(req,res)=>{
        const calendario=await Calendario.find();
        const data={"data":calendario};
        if(calendario.length > 0){
            res.json(data);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }    
    }

    static getSlider = async(req,res)=>{
        const area=req.params.area;
    
        const carousel= await Slider.find({area:area,estado:true}).sort({orden:1});

        if(Slider){
            res.json(carousel);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        } 
          
    }

    static getPopUps = async(req,res)=>{
        const popups=await PopUps.find({estado:true}).sort({orden:1});

        if(popups.length > 0){
            res.json(popups);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }
    }

    static getRegion = async(req,res)=> {
        const regiones=await Region.find();

        if(regiones){
            return res.status(200).json(regiones);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]});
        }    
    }

    static getPreguntasFrecuentes = async(req,res)=>{
        const tipo=req.params.tipo;
    
        const pf=await PreguntasFrecuentes.find({tipo:tipo});
    
        if(pf){
            res.status(200).json(pf);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]});
        }
    
    }

    static getNewsletter = async(req,res)=>{
            const nw=await Newsletter.find();
        
            if(nw){
                return res.status(200).json(nw);
            }else{
                return res.status(404).send({errors:["No se encuentra esa Publicacíon"]});
            } 
    }

    static getNewsletterDetails = async(req,res)=>{
        const id=req.params.id;
        const nw=await Newsletter.findById(id);
            
        if(nw){
            return res.status(200).json(nw);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]});
        }
    }

    static postNewsletterUser = async(req,res)=>{
        const email=req.body.email;
   
        const comprobante=await UsuarioNewsletter.find({email:email});
        let resps;
        if(comprobante.length > 0){
            resps={
                "res":false,
                "message":"Error usuario se encuentra registrado"
            }
        }else{
            const usuarionewsletter={
                email:email
            }
            let usuarionewsletterModel = new UsuarioNewsletter(usuarionewsletter);
            const respu=usuarionewsletterModel.save();
            resps={
                "res":true,
                "message":"Usuario registrado con exito"
            }
        }

        return res.status(201).json(resps);
    }

    static postCV = async (req,res)=>{
        const cv={
            nombre:req.body.nombre,
            email:req.body.email,
            telefono:req.body.telefono,
            areas:req.body.areas,
            mensaje:req.body.mensaje,
        }
    
        let cvModel = new Cv(cv);
    
        if(req.file){
            const ref=req.file;
            const filename=ref.filename;
            cvModel.setCv(filename);
        }
    
        cvModel.save();
    
        const resp={
            "res":true,
            "message":"Cv enviado con exito",
            "progress":100,
        }
    
        return res.status(201).json(resp)
    }


}

module.exports = APIController;