const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname=="avatar"){
        url='../grupoboletindeltrabajo-angular-14/src/assets/storage/avatar/';
      }
      if(file.fieldname=="slider"){
        url='../grupoboletindeltrabajo-angular-14/src/assets/storage/slider/';
      }
      if(file.fieldname=="calendario"){
        url='../grupoboletindeltrabajo-angular-14/src/assets/storage/calendario/';
      }
      if(file.fieldname=="temario"){
        url='../grupoboletindeltrabajo-angular-14/src/assets/storage/cursos/temario/';
      }
      if(file.fieldname=="portada"){
        url='../grupoboletindeltrabajo-angular-14/src/assets/storage/cursos/portada/'
      }
      if(file.fieldname=="popups"){
        url='../grupoboletindeltrabajo-angular-14/src/assets/storage/popups/'
      }
      if(file.fieldname=="noticiaportada"){
          url='../grupoboletindeltrabajo-angular-14/src/assets/storage/noticias/'
      }
      if(file.fieldname=="filedocumento" || file.fieldname=="portadadocumento"){
          url='../grupoboletindeltrabajo-angular-14/src/assets/storage/documentos/'
      }
      if(file.fieldname=="filenewsletter"){
        url='../grupoboletindeltrabajo-angular-14/src/assets/storage/newsletter/'
      }
      cb(null, url)
    },
    filename: function (req, file, cb) {
      cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
 })
   
const upload = multer({ storage: storage })

module.exports = upload;