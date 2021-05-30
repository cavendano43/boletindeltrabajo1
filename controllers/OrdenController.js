const {formateadordemiles,fechaformateada} = require('../helpers/formato');
const Cart = require('../models/Cart');
const Orden = require('../models/Orden');
var moment = require('moment');


class OrdenController{
   static OrdenPost = async(req,res)=>{
       const body=req.body;
       const idcart=body.datacompra.token_id;
       const token=body.dataorden.token;
       const items=await Cart.findById(idcart);
       const typ=body.dataorden.paymentTypeCode;
       let tipopago="",codigorespuesta="";

       if(typ=="VD"){
         tipopago="Venta Débito";
       }
       if(typ=="VN"){
        tipopago="Venta Normal";
       }
       if(typ=="VC"){
        tipopago="Venta en cuotas";
       }
       if(typ=="SI"){
        tipopago="3 cuotas sin interés";
       }
       if(typ=="S2"){
        tipopago="2 cuotas sin interés";
       }
       if(typ=="NC"){
        tipopago="N Cuotas sin interés";
       }
       if(typ=="VP"){
        tipopago="Venta Prepago";
       }

       if(body.dataorden.responseCode=='0'){
        codigorespuesta="Transacción aprobada";
       }
       if(body.dataorden.responseCode=='-1'){
        codigorespuesta="Rechazo de transacción - Reintente";
       }
       if(body.dataorden.responseCode=='-2'){
        codigorespuesta="Rechazo de transacción";
       }
       if(body.dataorden.responseCode=='-3'){
        codigorespuesta="Error en transacción";
       }
       if(body.dataorden.responseCode=='-4'){
        codigorespuesta="Rechazo emisor";
       }
       if(body.dataorden.responseCode=='-5'){
        codigorespuesta="Rechazo - Posible Fraude";
       }
       
       const data={
           id:body.datacompra.token_id,
           token:body.dataorden.token,
           user:[{
            nombre:body.datacompra.nombre,
            apellido:body.datacompra.apellido,
            razonsocial:body.datacompra.razonsocial,
            rut:body.datacompra.rut,
            email:body.datacompra.email,
            telefono:body.datacompra.telefono,
            direccion:body.datacompra.direccion,
            region:body.datacompra.region,
            comuna:body.datacompra.comuna,
            comentario:body.datacompra.comentario,
            estado:true,
           }],
           items:items.items,
           transactions:[{
               id:body.dataorden.sessionId,
               estado:body.dataorden.status,
               numeroorden:body.dataorden.buyOrder,
               numerodetarjeta:body.dataorden.cardNumber,
               fechadetransaction:body.dataorden.transactionDate,
               fechadetransactionformateada:fechaformateada(body.dataorden.transactionDate,'L'),
               codigodeautorizacion:body.dataorden.authorizationCode,
               tipodepago:tipopago,
               total:formateadordemiles(body.dataorden.amount),
               cuotasmonto:body.dataorden.installmentsAmount!='' ? formateadordemiles(body.dataorden.installmentsAmount):body.dataorden.installmentsAmount,
               numerosdecuotas:body.dataorden.installmentsNumber,
               codigoderespuesta:codigorespuesta,
               responseCode:body.dataorden.responseCode,
               balance:body.dataorden.balance
           }],
           total:items.total,
           totalformatedo:items.totalformateado,
           cantidadtotal:items.cantidad
        }

        const orden=await Orden.find({"token":token});
        
        if(orden.length == 0){
           
            let OrdenModel = new Orden(data);
   
            let resp=await OrdenModel.save();
            
        }
        console.log(orden);
       
       //console.log(data);
 
       res.json({"res":true,data:data});
   }
}
module.exports = OrdenController;