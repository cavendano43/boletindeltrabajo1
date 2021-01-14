const express = require('express')
const router = express.Router()
const bodyParse = require('body-parser')
var path = require('path');
var multer  = require('multer');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

/////////////////////////// controllers ///////////////////////
///const FiniquitoController = require("../controllers/FiniquitoController");
const APIController = require('../controllers/APIController'); 
const WebpayPlusController = require('../controllers/WebpayNormalController');
const CapacitacionController = require('../controllers/CapacitacionController');
const DocumentosController = require("../controllers/DocumentosController");
const NoticiasController = require('../controllers/NoticiasController'); 
////////////////////////// models ////////////////////////////

const Usuario=require('../models/Usuario');
const Comentario=require('../models/Comentario');


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
    respuesta.send('link https://grupoboletindeltrabajo.cl/');
})

/* webpay */
router.post("/webpay-normal/init", WebpayPlusController.init);
router.post("/webpay-normal/response", WebpayPlusController.response);
router.post("/webpay-normal/finish", WebpayPlusController.finish);
/*router.post("/calculo-finiquito",FiniquitoController.calculo);
router.post("/carta-finiquito",FiniquitoController.cartaAviso);
router.post("/generar-finiquito",FiniquitoController.finiquito);*/
////////////////////// grupoboletindeltrabajo //////////////////

router.get('/noticias/:area/',NoticiasController.noticiasAreas);
router.get('/ultimas/noticias',NoticiasController.noticiasUltima);
router.get('/noticias/:area/:id',NoticiasController.noticiasDetalles);
/////////////////////// API /////////////////////////////////
router.post('/cv',upload.single('cv'),APIController.postCV);
router.post("/contacto",APIController.Contacto);
router.get("/newsletter",APIController.getNewsletter);
router.get("/newsletter/:id",APIController.getNewsletterDetails);
router.get('/indicadoresultimos',APIController.getIndicadoresUltimos);
router.get('/indicadores/:tipo',APIController.getIndicadores);
router.post("/usuariosnewsletter",APIController.postNewsletterUser);
router.get("/slider/:area",APIController.getSlider);
router.get("/regiones",APIController.getRegion);
router.get("/preguntasfrecuentes/:tipo",APIController.getPreguntasFrecuentes);
router.get('/popups',APIController.getPopUps);
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


module.exports = router