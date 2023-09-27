const express = require('express');
const router = express.Router();
const { logger } = require('../config/pino');
const RespaldoController = require('../controllers/RespaldoController');

logger.info(`[RespaldoRouter] GET /respaldo/indicator/:type/:year`);
router.get('/indicator/:type/:year', RespaldoController.Indicator);

module.exports = router;