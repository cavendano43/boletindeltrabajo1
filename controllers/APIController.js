/////////// models //////////////////////////////////
const Calendario =require('../models/Calendario');
const Contacto =require('../models/Contacto');
const Cv=require('../models/Cv');
const Indicadores = require('../models/Indicadores');
const PopUps =require('../models/PopUps');
const Slider =require('../models/Slider');
const PreguntasFrecuentes=require('../models/PreguntasFrecuentes');
const Region= require('../models/Region');
const Newsletter=require('../models/Newsletter');
const UsuarioNewsletter=require('../models/UsuarioNewsletter');
//////////////////// helpers ///////////////////////
const {enviarCorreo} = require('../helpers/Nodemailer');
//////////////////// library /////////////////////
const moment = require('moment');
moment.locale('es'); 

class APIController{

    static Contacto = async(req,res)=>{
        let contacto={};

        if(req.body.apellidos){

            contacto.tipo="cursos";
            contacto.nombre=req.body.nombres;
            contacto.apellido=req.body.apellidos;
            contacto.email=req.body.correo;
            contacto.asunto=`Interes curso ${req.body.titulocurso}`;
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

    static getIndicadoresUltimos = async (req,res)=>{
        
        const fc=moment().format('L').toString().split('/');
        const fca=new Date();
   
        const diasemana=fca.getDay();
        const fecha=`${fc[2]}-${fc[1]}-${fc[0]}`;
        const fcm=`${fc[2]}-${fc[1]}-01`;
        const uf=await Indicadores.find({tipo:"UF",fecha:fecha});
        const utm=await Indicadores.find({tipo:"UTM",fecha:fcm});
        const ipc=await Indicadores.find({tipo:"I.P.C"}).sort({"fecha":-1}).limit(1);
        const iipc=await Indicadores.find({tipo:"Índice I.P.C"}).sort({"fecha":-1}).limit(1);
        const use=await Indicadores.find({tipo:"USE"}).sort({"fecha":-1}).limit(1);
        const rbmnb=await Indicadores.find({tipo:"RBMN Basica"}).sort({"fecha":-1}).limit(1);
        const rbmnm=await Indicadores.find({tipo:"RBMN Media"}).sort({"fecha":-1}).limit(1);
        let dolar,euro;
        if(diasemana==0 || diasemana==6){
             dolar=await Indicadores.find({tipo:"Dolar"}).sort({"fecha":-1}).limit(1);
             euro=await Indicadores.find({tipo:"Euro"}).sort({"fecha":-1}).limit(1);
        }else{
            euro=await Indicadores.find({tipo:"Euro",fecha:fecha}).limit(1);
   
            if(euro.length === 0){
                euro=await Indicadores.find({tipo:"Euro"}).sort({"fecha":-1}).limit(1);
            }
            dolar=await Indicadores.find({tipo:"Dolar",fecha:fecha}).limit(1);
     
            if(dolar.length === 0){
              dolar=await Indicadores.find({tipo:"Dolar"}).sort({"fecha":-1}).limit(1);
            }
        }
        const data={
            "dolar":dolar[0].valor,
            "euro":euro[0].valor,
            "uf":uf.length !== 0 ? uf[0].valor:0,
            "utm":utm.length !== 0 ? utm[0].valor:0,
            "ipc":ipc.length !== 0 ? ipc[0].valor:0,
            "iipc":iipc.length !== 0 ? iipc[0].valor:0,
            "use":use.length !== 0 ? use[0].valor:0,
            "rbmnb":rbmnb.length !== 0 ? rbmnb[0].valor:0,
            "rbmnm":rbmnb.length !== 0 ? rbmnm[0].valor:0,
        }
        if(data){
            return res.status(200).json(data);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }
        
    }
    static getIndicadores = async(req,res)=>{
        const types=req.params.tipo;
        const anio=req.headers.anio
        let tipo;
        let indicador;
        if(anio==''){
            if(types=='ipc'){
                tipo="I.P.C";
            }
            if(types=='iipc'){
                tipo="Índice I.P.C";
            }
            if(types=='imm'){
                tipo='Ingreso Mínimo';
            }
            if(types=='utm'){
                tipo='UTM';
            }
            indicador=await Indicadores.find({tipo:tipo}).sort({fecha:1});
        }else{
            tipo=types;
            indicador=await Indicadores.find({tipo:new RegExp(tipo, "i"),anio:anio}).sort({fecha:1});
        }

        if(indicador){
            return res.status(200).json(indicador);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }
    }

    static getCalendario = async(req,res)=>{
        const calendario=await Calendario.find();
        const data={"data":calendario};
        if(calendario.length > 0){
            res.status(200).json(data);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }    
    }
    
    static getCalendarioById = async(req,res)=>{
        const anio = req.params.anio;
        const fecha = `/.*${anio}.*/`:
        const calendario=await Calendario.find({"fecha":fecha});
        const data={"data":calendario};
        if(calendario.length > 0){
            res.status(200).json(data);
        }else{
            return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
        }
    }

    static getSlider = async(req,res)=>{
        const area=req.params.area;
    
        const carousel= await Slider.find({area:area,estado:true}).sort({orden:1});

        if(Slider){
            res.status(200).json(carousel);
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
