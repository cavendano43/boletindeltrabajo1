/// moment /////
var moment = require('moment');
moment.locale('es'); 
/////// helpers ////////
const { encrypPassword } = require("../helpers/users.helper");
const { logger } = require('../config/pino');
///// models ///////////////////////////
const Indicadores=require('../models/Indicadores');
const PreguntasFrecuentes=require('../models/PreguntasFrecuentes');
const Contacto=require('../models/Contacto');
const Noticias=require('../models/Noticias');
const Usuario=require('../models/Usuario');
const Newsletter=require('../models/Newsletter');
const FeriadoLegal = require('../models/FeriadoLegal');
const Calendario = require('../models/Calendario');
const Slider = require('../models/Slider');
const Popups = require('../models/PopUps');
class AdminController{

    static getSlider = async(req,res)=>{
        try{
            const response = await Slider.find();
            return res.status(200).send({code:200,status:true,payload:response});
        } catch(e) {
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }


    static getPopups = async(req,res)=>{
        try{
            const response = await Popups.find();
            return res.status(200).send({code:200,status:true,payload:response});
        } catch(e) {
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static getCalendar = async(req,res)=>{
        try{
            const response = await Calendario.find();
            return res.status(200).send({code:200,status:true,payload:response});
        } catch(e) {
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static postCalendar = async(req,res)=>{
        try {
            let body=req.body;
      
            let img = "";
            if(req.file){
                const filename=req.file.filename;
                img=`assets/storage/calendario/${filename}`
            }
            body.previewImageSrc = img;
            body.thumbnailImageSrc = img;

            const model = new Calendario(body);
         
            const response = await model.save();
            return res.status(200).json({code:200,status:true,payload:response})
        } catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static putCalendar = async(req,res)=>{
        try {
            const {id,alt,title,fecha,imgs} = req.body;
            let img = "";
            if(req.file){
                const filename=req.file.filename;
                img=`assets/storage/calendario/${filename}`;
            }else{
                img=imgs;
            }
            const previewImageSrc = img;
            const thumbnailImageSrc = img;
            const response = await Calendario.findByIdAndUpdate(id,{alt,title,fecha,previewImageSrc,thumbnailImageSrc});
            return res.status(200).json({code:200,status:true,payload:response})
        } catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static deleteCalendar = async(req,res)=>{
        try{
            const {id} = req.params;
            const calendario=await Calendario.findByIdAndDelete(id);
            return res.status(200).json({code:200,status:true,payload:calendario});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
    static getFeriadoLegal = async(req,res)=>{
        try{
            const response = await FeriadoLegal.find();
            return res.status(200).send({code:200,status:true,payload:response});
        } catch(e) {
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
    static getNewsletter = async(req,res)=>{
        try{
            const newsletter=await Newsletter.find();
            return res.status(200).json({code:200,status:true,payload:newsletter});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static deleteNewsletterAll = async(req,res)=>{
        try{
            const newsletter=await Newsletter.deleteMany({});
            return res.status(200).json({code:200,status:true,payload:newsletter});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
    static getUser = async(req,res)=>{
        try{
            const user=await Usuario.find();
            return res.status(200).json({code:200,status:true,payload:user});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
    static postUser = async(req,res)=>{
        try{
            let body = req.body;
            if(req.file){
                body.avatar = `assets/storage/avatar/${req.file.filename}`;
            }
            body.hashpassword = encrypPassword(body.password);
            body.status = true;
            const model = new Usuario(body);
            const user=await model.save();
            return res.status(200).json({code:200,status:true,payload:user});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
    static putUser = async(req,res)=>{
        try{
            const {id,nombre,apellido,rut,telefono,razonsocial,descripcion,direccion,rol,numerodecontrato,email,fechainicio,fechavencimiento,password,imgavatar}= req.body;
            let avatar
            if(req.file){
                avatar = `assets/storage/avatar/${req.file.filename}`;
            }else {
                avatar = imgavatar;
            }
            const hashpassword = encrypPassword(password);
            const user = await Usuario.findByIdAndUpdate(id,{nombre,apellido,rut,telefono,razonsocial,descripcion,direccion,rol,numerodecontrato,email,fechainicio,fechavencimiento,password,hashpassword,avatar});
            return res.status(200).json({code:200,status:true,payload:user});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e,errors:e});
        }
    }
    static deleteUser = async(req,res)=>{
        try{
            const {id} = req.params;
            const user=await Usuario.findByIdAndDelete(id);
            return res.status(200).json({code:200,status:true,payload:user});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static deleteUserAll = async(req,res)=>{
        try{
            const user=await Usuario.deleteMany({});
            return res.status(200).json({code:200,status:true,payload:user});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
    static getNoticia = async(req,res)=>{
        try{
            logger.info(`[AdminController] getNoticia inicio`);
            const noticia=await Noticias.find();
            const response = {code:200,status:true,payload:noticia}
            logger.info(`[AdminController] getNoticia response dataBase ${JSON.stringify(response)}`);
            return res.status(200).json(response);
        }catch(e){
            const error = {code:404,status:false,message:"error del servidor",errors:e};
            logger.error(`[AdminController] getNoticia response dataBase ${JSON.stringify(error)}`);
            return res.status(404).send(error);
        }
    }

    static postNoticia = async(req,res)=>{
        try {
            logger.info(`[AdminController] postNoticia inicio`);
            const noticia=req.body;
            noticia.fechaFormateada=moment(noticia.fechaEdicion).format('LL');
            noticia.fechaSubida=noticia.fechaEdicion;
            let portada = "";

            if(noticia.type === "portal"){
                logger.info(`[AdminController] postNoticia guardo desde portal`);
                portada = noticia.portada;
            }else {
                logger.info(`[AdminController] postNoticia guardo desde grupo`);
                if(req.file){
                    const filename=req.file.filename;
                    portada=`assets/storage/noticias/${filename}`
                }
            }
        
            noticia.portada=portada;
            noticia.tags1=req.body.tags;
            const noticiasModel = new Noticias(noticia);
            const response = await noticiasModel.save();
            const resp = {code:200,status:true,payload:response}
            logger.info(`[AdminController] postNoticia response: ${JSON.stringify(resp)}`);
            return res.status(200).json(resp);
        } catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static putNoticia = async(req,res)=>{
        try {
            const {id,tipo,autor,titulo,categoria,tags,resumen,contenido,estado,fechaEdicion,rutaportada} = req.body;
            
            const fechaFormateada=moment(fechaEdicion).format('LL');
            const fechaSubida=fechaEdicion;
            let portada;
            if(req.file){
                const filename=req.file.filename;
                portada=`assets/storage/noticias/${filename}`;
            }else{
                portada=rutaportada;
            }

            const updatedNoticias= await Noticias.findByIdAndUpdate(id,{tipo,autor,titulo,categoria,tags,resumen,contenido,estado,fechaEdicion,fechaSubida,fechaFormateada,portada});
        
            return res.status(200).json({code:200,status:true,payload:updatedNoticias})
        } catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
    static deleteNoticia = async(req,res)=>{
        try {
            const id=req.params.id;
            const response = await Noticias.deleteOne({_id:id});
            return res.status(200).json({code:200,status:true,payload:response})
        } catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static deleteNoticiaAll = async(req,res)=>{
        try {
           const response = await Noticias.deleteMany({})
           return res.status(200).json({code:200,status:true,payload:response});
        } catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
    
    static getContacto = async(req,res)=>{
        try{
            const contacto=await Contacto.find();
            return res.status(200).json({code:200,status:true,payload:contacto});
        }catch(e){
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static preguntasfrecuentesGet = async(req,res)=>{
        try {
            const pregunta=await PreguntasFrecuentes.find();
            return res.status(200).json({code:200,status:true,payload:pregunta});
        } catch(e) {
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static preguntasfrecuentesPost = async (req,res)=>{
        try {
            const preguntas=req.body;
            preguntas.fecha=moment().format('L');
            let preguntasModel = new PreguntasFrecuentes(preguntas);
            preguntasModel.save();
            return res.status(200).json({code:200,status:true,message:"Registro exítoso"});
        } catch(e) {
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
    
    static preguntasfrecuentesPut = async (req,res)=>{
        try {
            const {id,tipo,area,titulo,contenido} = req.body
            const updatedPreguntas= await PreguntasFrecuentes.findByIdAndUpdate(id,{tipo,area,titulo,contenido});
            return res.status(200).json({code:200,status:true,"payload":updatedPreguntas});
        } catch(e) {
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static preguntasfrecuentesDelete = async (req,res)=>{
        try{
            const id=req.params.id;
            const resp=await PreguntasFrecuentes.deleteOne({_id:id});
            return res.json({code:200,status:true,message:"Eliminación exítosa"});
        } catch(e) {
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    static indicadoresGet = async(req,res)=>{
        try {
            const indicadores=await Indicadores.find();
            return res.status(200).json({code:200,status:true,"payload":indicadores});
        } catch(e) {
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
    static indicadoresPost = async(req,res)=>{
        try {
            const {tipo,valor,fecha,fechamonth,regimengeneral,mayormenor,finesnoremuneracionales,casaparticular}=req.body;
            const fc=fecha!='' ? fecha.split("-") : (fechamonth+"-01").split("-");
            console.log(fechamonth);
            const dia=fc[2],
            mes=fc[1],
            anio=fc[0];
    
            const indicadores={
                tipo:tipo,
                dia:dia,
                mes:mes,
                anio:anio,
                valor:valor,
                valores:[
                    {
                    regimengeneral:regimengeneral,
                    mayormenor:mayormenor,
                    finesnoremuneracionales:finesnoremuneracionales,
                    casaparticular:casaparticular
                    }
                ],
                fecha:anio+"-"+mes+"-"+dia,
            }
            let indicadoresModel = new Indicadores(indicadores);
            
            await indicadoresModel.save();
            return res.status(200).json({code:200,status:true,message:"Registro exítoso"});
        } catch(e) {
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
    static indicadoresPut = async(req,res)=>{
        try{
            const {id,tipo,valor,fechamonth,regimengeneral,mayormenor,finesnoremuneracionales,casaparticular}=req.body;
            let fecha=req.body.fecha;
            const fc=fecha!='' ? fecha.split("-") : (fechamonth+"-01").split("-");
            const dia=fc[2],
            mes=fc[1],
            anio=fc[0];
            const valores=[{
                regimengeneral:regimengeneral,
                mayormenor:mayormenor,
                finesnoremuneracionales:finesnoremuneracionales,
                casaparticular:casaparticular
            }];
                
            fecha=anio+"-"+mes+"-"+dia;
            const updatedIndicador= await Indicadores.findByIdAndUpdate(id,{tipo,valor,dia,mes,anio,fecha,valores});
            return res.status(200).json({code:200,status:true,payload:updatedIndicador});
        } catch(e) {
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }
    static indicadoresDelete = async(req,res)=>{
        try{
        const id=req.params.id;
        const removeindicador=await Indicadores.deleteOne({_id:id});
        return res.json.status(200).json({code:200,status:true,payload:removeindicador})
        } catch(e) {
            return res.status(404).send({code:404,status:false,message:"error del servidor",errors:e});
        }
    }

    
}

module.exports = AdminController;