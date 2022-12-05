const express = require('express')
const router = express.Router();
var path = require('path');
var multer  = require('multer');
const { logger } = require('../config/pino');
/////////////////////////// controllers ///////////////////////
const FiniquitoController = require("../controllers/FiniquitoController");
//const WebpayPlusController = require('../controllers/WebpayNormalController');
const APIController = require('../controllers/APIController'); 
const CartController = require('../controllers/CartController');
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



/* webpay 
router.post("/webpay-normal/init", WebpayPlusController.init);
router.post("/webpay-normal/response", WebpayPlusController.response);
router.post("/webpay-normal/finish", WebpayPlusController.finish);
*/
logger.info(`[APIRouter] POST /calculo-finiquito`);
router.post("/calculo-finiquito",FiniquitoController.calculo);
logger.info(`[APIRouter] POST /generar-finiquito`);
router.post("/generar-finiquito",FiniquitoController.finiquito);
logger.info(`[APIRouter] POST /carta-finiquito`);
router.post("/carta-finiquito",FiniquitoController.cartaAviso);
logger.info(`[APIRouter] GET /feriados-legal`);
router.get("/feriados-legal",FiniquitoController.feriadoLegal);
////////////////////// grupoboletindeltrabajo //////////////////
logger.info(`[APIRouter] GET /noticias/:area/`);
router.get('/noticias/:area/',NoticiasController.noticiasAreas);
logger.info(`[APIRouter] GET /ultimas/noticias`);
router.get('/ultimas/noticias',NoticiasController.noticiasUltima);
logger.info(`[APIRouter] GET /noticias/:area/:id`);
router.get('/noticias/:area/:id',NoticiasController.noticiasDetalles);
logger.info(`[APIRouter] GET /comentarios/:id`);
router.get('/comentarios/:id',NoticiasController.getComentario);
logger.info(`[APIRouter] POST /comentario/registrar`);
router.post('/comentario/registrar',NoticiasController.postComentario);
logger.info(`[APIRouter] PUT /comentario/editar`);
router.put('/comentario/editar',NoticiasController.putReplyComentario);
/////////////////////// API /////////////////////////////////
router.post('/cv',upload.single('cv'),APIController.postCV);
logger.info(`[APIRouter] POST /contacto`);
router.post("/contacto",APIController.Contacto);
logger.info(`[APIRouter] GET /newsletter`);
router.get("/newsletter",APIController.getNewsletter);
logger.info(`[APIRouter] GET /newsletter/:id`);
router.get("/newsletter/:id",APIController.getNewsletterDetails);
logger.info(`[APIRouter] GET /indicadoresultimos`);
router.get('/indicadoresultimos',APIController.getIndicadoresUltimos);
logger.info(`[APIRouter] GET /indicadores/:tipo`);
router.get('/indicadores/:tipo',APIController.getIndicadores);
logger.info(`[APIRouter] POST /usuariosnewsletter`);
router.post("/usuariosnewsletter",APIController.postNewsletterUser);
logger.info(`[APIRouter] GET /slider/:area`);
router.get("/slider/:area",APIController.getSlider);
logger.info(`[APIRouter] GET /regiones`);
router.get("/regiones",APIController.getRegion);
logger.info(`[APIRouter] GET /preguntasfrecuentes/:tipo`);
router.get("/preguntasfrecuentes/:tipo",APIController.getPreguntasFrecuentes);
logger.info(`[APIRouter] GET /popups`);
router.get('/popups',APIController.getPopUps);
logger.info(`[APIRouter] GET /ferido-legal`);
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
