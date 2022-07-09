const path = require('path');
const multer  = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname=="cv"){
        url='../frontend/src/assets/storage/cv/';
      }
      if(file.fieldname=="slider"){
        url='../frontend/src/assets/storage/slider/';
      }
      if(file.fieldname=="temario"){
        url='../frontend/src/assets/storage/cursos/temario/';
      }
    
      cb(null, url)
    },
    filename: function (req, file, cb) {
      cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
 })
   
const upload = multer({ storage: storage })

module.exports = upload;