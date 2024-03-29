const express = require('express');
const router = express.Router();
const { logger } = require('../config/pino');
////////// helpers  //////////
const upload = require('../helpers/MulterAdmin.helper');
////////// controllers /////////
const AdminController = require ('../controllers/AdminController');

logger.info(`[AdminRouter] GET /slider`);
router.get('/slider',AdminController.getSlider);
logger.info(`[AdminRouter] GET /calendario`);
router.get('/calendario',AdminController.getCalendar);
router.get('/popups',AdminController.getPopups);
router.post('/calendario/registrar',upload.single('calendario'),AdminController.postCalendar);
router.put('/calendario/editar',upload.single('calendario'),AdminController.putCalendar);
router.delete('/calendario/eliminar/:id',AdminController.deleteCalendar);

logger.info(`[AdminRouter] GET admin/ferido-legal`);
router.get('/ferido-legal',AdminController.getFeriadoLegal);


logger.info(`[AdminRouter] POST admin/ferido-legal/add`);
router.post('/ferido-legal/add',AdminController.addFeriadosLegales);

router.get('/newsletter',AdminController.getNewsletter);
router.delete('/newsletter/eliminar-all',AdminController.deleteNewsletterAll);
router.get('/usuario',AdminController.getUser);
router.post('/usuario/registrar',upload.single('avatar'),AdminController.postUser);
router.put('/usuario/editar',upload.single('avatar'),AdminController.putUser);
router.delete('/usuario/eliminar/:id',AdminController.deleteUser);
router.delete('/usuario/eliminar-all',AdminController.deleteUserAll);
router.get('/noticias',AdminController.getNoticia);
router.delete('/noticias/eliminar/:id',AdminController.deleteNoticia);
router.post('/noticias/registrar',upload.single('noticiaportada'),AdminController.postNoticia);
router.put('/noticias/editar',upload.single('noticiaportada'),AdminController.putNoticia);
router.delete('/noticias/eliminar-all',AdminController.deleteNoticiaAll);
router.get('/contacto',AdminController.getContacto);
router.get('/preguntas-frecuentes',AdminController.preguntasfrecuentesGet);
router.post('/preguntas-frecuentes/registrar',AdminController.preguntasfrecuentesPost);
router.put('/preguntas-frecuentes/editar',AdminController.preguntasfrecuentesPut);
router.delete('/preguntas-frecuentes/eliminar/:id',AdminController.preguntasfrecuentesDelete);
router.get('/indicadores',AdminController.indicadoresGet);
router.post('/indicadores/registrar',AdminController.indicadoresPost);
router.put('/indicadores/editar',AdminController.indicadoresPut);
router.delete('/indicadores/eliminar/:id',AdminController.indicadoresDelete);


module.exports = router;