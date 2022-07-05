const express = require('express')
const router = express.Router()
//////////// controllers /////////////
const AuthController = require('../controllers/AuthController');

router.post('/forgot-password', AuthController.forgotPassword);
router.post('/sign-in',AuthController.signIn);
router.post('/sign-up',AuthController.signUp);
router.post('/reset-password',AuthController.resetPasswordController);
router.post('/refresh-token',AuthController.refresToken);

module.exports = router;