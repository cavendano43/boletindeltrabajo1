const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname=="avatar"){
        url='../frontend/src/assets/storage/avatar/';
      }
      if(file.fieldname=="slider"){
        url='../frontend/src/assets/storage/slider/';
      }
      if(file.fieldname=="temario"){
        url='../frontend/src/assets/storage/cursos/temario/';
      }
      if(file.fieldname=="portada"){
        url='../frontend/src/assets/storage/cursos/portada/'
      }
      if(file.fieldname=="popups"){
        url='../frontend/src/assets/storage/popups/'
      }
      if(file.fieldname=="noticiaportada"){
          url='../frontend/src/assets/storage/noticias/'
      }
      if(file.fieldname=="filedocumento" || file.fieldname=="portadadocumento"){
          url='../frontend/src/assets/storage/documentos/'
      }
      if(file.fieldname=="filenewsletter"){
        url='../frontend/src/assets/storage/newsletter/'
      }
      cb(null, url)
    },
    filename: function (req, file, cb) {
      cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
 })
   
const upload = multer({ storage: storage })

module.exports = upload;