const express = require('express');
const router = express.Router();
////////// helpers  //////////
const upload = require('../helpers/MulterAdmin.helper');
////////// controllers /////////
const AdminController = require ('../controllers/AdminController');
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