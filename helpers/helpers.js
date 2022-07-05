const fs=require('fs');

exports.getMes = function(mes){
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  return meses[mes];
}

exports.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  exports.crearFichero  = (ruta,data)=>{
  
   fs.writeFile(ruta, data, function (err) {
    if (err) return console.log(err);
    console.log('fichero creado');
    });
  
  }
  exports.eliminarFichero = function(fichero){
  
    fs.exists(fichero,(exists) => {
         
      if(exists){
  
          fs.unlink(fichero, function(err) {
              if (err) throw err;
            
              console.log('file deleted');
          });
      
      }
      
    });
  
  }

  exports.cambiarNombreFichero = function(rutaAnterior,rutaNueva){
  
    fs.rename(rutaAnterior,rutaNueva,(error)=>{
      if(error){
        console.log(error.message);
      }
    })
  
  }
  
  exports.moverFichero = function(fichero,nuevaRuta){
    fs.move(fichero,nuevaRuta,{ overwrite: true });
  }