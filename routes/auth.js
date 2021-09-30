const express = require('express')
const router = express.Router()
//////////// controllers /////////////
const AuthController = require('../controllers/AuthController');

router.post('/user/forgot-password', AuthController.forgotPassword);
router.post('/user/sing-in',AuthController.singIn);
router.post('/user/reset-password',AuthController.resetPasswordController);
router.post('/user/refresh-token',AuthController.refresToken);

module.exports = router;