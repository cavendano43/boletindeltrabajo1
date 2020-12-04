const express = require('express')
const router = express.Router()
const bodyParse = require('body-parser')
var path = require('path');
var multer  = require('multer');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

/////////////////////////// controllers ///////////////////////
///const FiniquitoController = require("../controllers/FiniquitoController");
const WebpayPlusController = require('../controllers/WebpayNormalController');
const DocumentosController = require("../controllers/DocumentosController");
const CapacitacionController = require('../controllers/CapacitacionController');
////////////////////////// models ////////////////////////////

const Contacto =require('../models/Contacto');
const Noticias=require('../models/Noticias');
const Usuario=require('../models/Usuario');
const Comentario=require('../models/Comentario');
const Newsletter=require('../models/Newsletter');
const UsuarioNewsletter=require('../models/UsuarioNewsletter');
const Cv=require('../models/Cv');
const Slider =require('../models/Slider');
const PopUps =require('../models/PopUps');
const PreguntasFrecuentes=require('../models/PreguntasFrecuentes');
const Region= require('../models/Region');
///////////////////////////// middleware ///////////////////////////
const utf8=require('utf8');
const bcrypt = require ('bcrypt') ;   

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/storage/cv/')
    },
    filename: function (req, file, cb) {
      cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
 })

   
var upload = multer({ storage: storage })

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_USER, // generated ethereal user
      pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
    },tls:{
        rejectUnauthorized: false
      }
  });


router.get("/",(peticion,respuesta)=>{
    respuesta.send('link https://grupoboletindeltrabajo-b871d.web.app/');
})

/* webpay */
router.post("/webpay-normal/init", WebpayPlusController.init);
router.post("/webpay-normal/response", WebpayPlusController.response);
router.post("/webpay-normal/finish", WebpayPlusController.finish);
/*router.post("/calculo-finiquito",FiniquitoController.calculo);
router.post("/carta-finiquito",FiniquitoController.cartaAviso);
router.post("/generar-finiquito",FiniquitoController.finiquito);*/
//////////////////////// capacitacion //////////////////////////

router.get('/cursos-group',CapacitacionController.groupCursos);
router.get('/cursos/row',CapacitacionController.cursosRow);
router.get('/cursos',CapacitacionController.cursos);
router.get('/cursosc/:id',CapacitacionController.cursosDetail);

router.post('/rating',CapacitacionController.Postrating);
router.get('/rating/:id',CapacitacionController.rating);
router.get("/eventos",CapacitacionController.eventos);
/////////////////////// portal de soluciones ///////////////////
router.get("/documento/:area",DocumentosController.documentos);
router.get("/documentos/:id",DocumentosController.documentosdetalles);

router.get("/regiones",async(req,res)=>{
    const regiones=await Region.find();

    if(regiones){
        return res.status(200).json(regiones);
    }else{
        return res.status(404).send({errors:["No se encuentra esa Publicacíon"]});
    }    
})
router.get("/preguntasfrecuentes/:tipo",async(req,res)=>{
    const tipo=req.params.tipo;

    const pf=await PreguntasFrecuentes.find({tipo:tipo});

    if(pf){
        res.status(200).json(pf);
    }else{
        return res.status(404).send({errors:["No se encuentra esa Publicacíon"]});
    }

});
router.get("/slider/:area",async(req,res)=>{
    const area=req.params.area;
    
    const carousel= await Slider.find({area:area,estado:true}).sort({orden:1});

    if(Slider){
        res.json(carousel);
    }else{
        return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
    }    
});

router.get('/popups',async(req,res)=>{
    const popups=await PopUps.find({estado:true}).sort({orden:1});

    if(popups.length > 0){
        res.json(popups);
    }else{
        return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
    }
});

router.get("/newsletter",async(req,res)=>{
    const nw=await Newsletter.find();

    if(nw){
        return res.status(200).json(nw);
    }else{
        return res.status(404).send({errors:["No se encuentra esa Publicacíon"]});
    } 
})
router.get("/newsletter/:id",async(req,res)=>{
    const id=req.params.id;
    
    const nw=await Newsletter.findById(id);
    
    if(nw){
        return res.status(200).json(nw);
    }else{
        return res.status(404).send({errors:["No se encuentra esa Publicacíon"]});
    }
})
router.post("/usuariosnewsletter",async(req,res)=>{
    const email=req.body.subscribeSr;
    console.log(email);
    const comprobante=await UsuarioNewsletter.find({email:email});
    if(comprobante.length > 0){
    
        resps={
            "estatus":0,
        }
    }else{
        const usuarionewsletter={
            email:email
        }
        let usuarionewsletterModel = new UsuarioNewsletter(usuarionewsletter);
        const respu=usuarionewsletterModel.save();
        resps={
            "estatus":1,
           
        }
    }
   
    res.json(resps)
})

router.post('/cv',upload.single('cv'),(req,res)=>{


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
        "respuesta":1,
        "progress":100,
    }

    return res.status(201).json({resp})
});


router.post("/contacto",async(req,res)=>{
 
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
    //enviarCorreoBienvenida(email,nombre,asunto,telefono,mensaje);
    return res.json({"res":1});

})

router.get('/noticias/:area/',async(req,res)=>{
    const busqueda = ( req.query.busqueda ) ? req.query.busqueda : ""
    const area=req.params.area;
    let noticias;
    if(area=="all"){
        noticias= await Noticias.find({},{_id:1,titulo:1,categoria:1,resumen:1,portada:1,autor:1});
    }else{
        noticias= await Noticias.find({categoria:area},{_id:1,titulo:1,categoria:1,resumen:1,portada:1,autor:1});
    }

    if(noticias){
        return res.json({noticias})
    }else{
        return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
    }

})

router.get('/ultimas/noticias',async(req,res)=>{
    const sidebar=[];
    const noticias= await Noticias.find().sort({fechaEdicion:-1}).limit(3);


    if(noticias){
        return res.json(noticias)
    }else{
        return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
    }

})

router.get('/noticias/:area/:id',async(req,res)=>{
    const id=req.params.id;
    const area=req.params.area;

    const noticias = await Noticias.findById(id);

    sumarvisita(id);
    
    if(noticias){
        return res.json(noticias)
    }else{
        return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
    }

})


router.get('/comentarios/:id',async(req,res)=>{
   
    const id=req.params.id;

    const comentario= await Comentario.find({id:id});
   
    if(comentario){
        return res.json(comentario)
    }else{
        return res.status(404).send({errors:["No se encuentra esa Publicacíon"]})
    }
});


router.post('/comentario/registrar',async(req,res)=>{
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

    }
    
    let comentarioModel=new Comentario(comment);
    const resp=await comentarioModel.save(); 
    
    
    return res.status(201).json(resp);
})





function promesa(cambio){
    
    const promesa=new Promise((resolve,reject)=>{
        if(cambio!=""){
            resolve(utf8.decode(cambio))
        }else{
            reject('');
        }
    })

    return promesa;

}





async function enviarCorreoBienvenida(email,nombre,asunto,telefono,mensaje){
  
    const opciones = {
      from:'contacto@grupoboletindeltrabajo.cl',
      to:email,
      subject: asunto,
      text:`
      Nombre: ${nombre}
      Email: ${email}
      Asunto: ${asunto} 
      Telefono: ${telefono}
      mensaje:
       ${mensaje}
      `
    }
  
    await transporter.sendMail(opciones,(error,info)=>{

        if(info){
            console.log(info)
            return 1;
            
          }else{
            console.log(error)
            return 0;
            
        }
    })
  
  }

function verifytToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Uthorize Request');
    }
    
    const token = req.headers.authorization.split(' ')[1];
    if(toke === 'null'){
        return res.status(401).send('Unathorize Request');
    }

    const payload= jwt.verify(token,'secretKey');
    req.userId = payload._id;
    next();

    console.log(payload);
}

async function encritarpassword(password){

    const saltRounds = 10;

    const hashPassword= await bcrypt.hash(password,saltRounds);

    return hashPassword;

}
async function sumarvisita(id){
   const res=await Noticias.findByIdAndUpdate(id,{ $inc: {visitas:1}});
   return res;
}

module.exports = router