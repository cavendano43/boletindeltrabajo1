const express = require('express')
const router = express.Router()
var upload = require('../helpers/Multer');
//////////// controllers /////////////
const UserController = require('../controllers/UserController');

router.get('/check-email/:email',UserController.checkEmail);
router.get('/profile/:id',UserController.getProfile);
router.put('/profile/put',UserController.putProfile);
router.put('/profile/delete-avatar',UserController.deleteAvatar);
router.put('/profile/put-avatar',upload.single('avatar'),UserController.putAvatar);
router.put('/changepassword',UserController.changePassword);

module.exports = router;