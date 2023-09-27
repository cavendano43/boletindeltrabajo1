const axios = require("axios");
 ///// models ///////////////////////////
 const Indicadores=require('../models/Indicadores');
 const PreguntasFrecuentes=require('../models/PreguntasFrecuentes');
 const Contacto=require('../models/Contacto');
 const Noticias=require('../models/Noticias');
 const Usuario=require('../models/Usuario');
 const Newsletter=require('../models/Newsletter');
 const FeriadoLegal = require('../models/FeriadoLegal');
 const Calendario = require('../models/Calendario');
 const Slider = require('../models/Slider');
 const Popups = require('../models/PopUps');
const { forEach } = require("lodash");
class RespaldoController {
    static Indicator = async (req, res) => {
        const { type, year } = req.params;
        console.log("type ---->",type);
        const url = `https://mindicador.cl/api/${type}/${year}`;
        const { data } = await axios.get(url);
        console.log(data);
        const dataI =  [];
        if(data){
            data.serie.forEach(element => {

            })
        }
        //const response = await Indicadores.deleteMany({tipo:{ $regex: new RegExp(type, 'i') },anio:year});

        //const insert = await Indicadores.insertMany(dataI);
        return res.status(200).json({code:200,status:true,payload:data})
    }
}

module.exports = RespaldoController;