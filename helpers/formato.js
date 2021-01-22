var moment = require('moment');
moment.locale('es'); 
exports.rut = function(){

}
exports.formateadordemiles= function (num){
    if(!isNaN(num)){
      num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
      num = num.split('').reverse().join('').replace(/^[\.]/,'');
    
    }
      return num;
}
exports.fechaformateada = function (date,formato){
    const fecha=moment(date).format(formato);
    return fecha;
}