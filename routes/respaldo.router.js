const express = require('express');
const router = express.Router();
const { logger } = require('../config/pino');
const RespaldoController = require('../controllers/RespaldoController');

logger.info(`[RespaldoRouter] router:`);
logger.info(`[RespaldoRouter] GET /respaldo/indicator/:type/:year`);
router.get('/indicator/:type/:year', RespaldoController.Indicator);


logger.info(`[RespaldoRouter] GET /respaldo/usuario`);
router.post('/usuario', RespaldoController.UsuarioR);


logger.info(`[RespaldoRouter] GET /respaldo/noticias`);
router.get('/noticias', RespaldoController.NoticiasR);


logger.info(`[RespaldoRouter] GET /respaldo/feriado-legal`);
router.get('/feriado-legal', RespaldoController.FeriadoLegalR);

module.exports = router;