const express = require('express')
const router = express.Router();
var path = require('path');
var multer  = require('multer');

/////////////////////////// controllers ///////////////////////
//const FiniquitoController = require("../controllers/FiniquitoController");
const APIController = require('../controllers/APIController'); 
const CartController = require('../controllers/CartController');
//const WebpayPlusController = require('../controllers/WebpayNormalController');
const CapacitacionController = require('../controllers/CapacitacionController');
const DocumentosController = require("../controllers/DocumentosController");
const NoticiasController = require('../controllers/NoticiasController');
const OrdenController = require('../controllers/OrdenController');
///////////////////////////// middleware ///////////////////////////

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/storage/cv/')
    },
    filename: function (req, file, cb) {
      cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
 })

   
var upload = multer({ storage: storage })

router.get("/",(req,res)=>{
    res.redirect('https://grupoboletindeltrabajo.cl/');
})


  // tipo de contrato mensual dividir por 1, quincenal dividir por 2, semanal dividir por 30/7, diario dividir por 30

/* webpay 
router.post("/webpay-normal/init", WebpayPlusController.init);
router.post("/webpay-normal/response", WebpayPlusController.response);
router.post("/webpay-normal/finish", WebpayPlusController.finish);

router.post("/calculo-finiquito",FiniquitoController.calculo);
router.post("/generar-finiquito",FiniquitoController.finiquito);
router.post("/carta-finiquito",FiniquitoController.cartaAviso);*/
////////////////////// grupoboletindeltrabajo //////////////////
router.get('/noticias/:area/',NoticiasController.noticiasAreas);
router.get('/ultimas/noticias',NoticiasController.noticiasUltima);
router.get('/noticias/:area/:id',NoticiasController.noticiasDetalles);
router.get('/comentarios/:id',NoticiasController.getComentario);
router.post('/comentario/registrar',NoticiasController.postComentario);
router.put('/comentario/editar',NoticiasController.putReplyComentario);
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
router.get('/ferido-legal',APIController.getFeriadoLegal);
//////////////////////// capacitacion //////////////////////////
router.get('/cursos-group',CapacitacionController.groupCursos);
router.get('/cursos/row',CapacitacionController.cursosRow);
router.get('/cursos',CapacitacionController.cursos);
router.get('/cursosc/:id',CapacitacionController.cursosDetail);
router.post('/rating',CapacitacionController.Postrating);
router.get('/rating/:id',CapacitacionController.rating);
router.get("/eventos",CapacitacionController.eventos);
//////////////// cart //////////////////////
router.get('/cart/:id',CartController.CartGet);
router.post('/cart/registrar',CartController.CartPost);
router.put('/cart/editar',CartController.CartPut);
router.put('/cart/quality-item',CartController.CartChangeQualityPut);
router.post('/cart/delete-items',CartController.CartDeleteItem);
router.delete('/cart/delete-all-items/:id',CartController.CartDeleteAllItems);
//////////////// orden //////////////////////
router.post('/cart/post-orden',OrdenController.OrdenPost);
/////////////////////// portal de soluciones ///////////////////
router.get("/calendario",APIController.getCalendario);
router.get("/calendario/:anio",APIController.getCalendarioById);
router.get("/documento/:area",DocumentosController.documentos);
router.get("/documentos/:id",DocumentosController.documentosdetalles);

module.exports = router
