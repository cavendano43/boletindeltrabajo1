const axios = require("axios");
const FormData = require('form-data');

const { encrypPassword } = require("../helpers/users.helper");
///// models ///////////////////////////
const Indicadores = require('../models/Indicadores');
const PreguntasFrecuentes = require('../models/PreguntasFrecuentes');
const Contacto = require('../models/Contacto');
const Noticias = require('../models/Noticias');
const Usuario = require('../models/Usuario');
const Newsletter = require('../models/Newsletter');
const FeriadoLegal = require('../models/FeriadoLegal');
const Calendario = require('../models/Calendario');
const Slider = require('../models/Slider');
const Popups = require('../models/PopUps');

class RespaldoController {
    static Indicator = async (req, res) => {
        try{
            const { type, year } = req.params;
            console.log("type ---->", type);
            const url = `https://mindicador.cl/api/${type}/${year}`;
            const { data } = await axios.get(url);
            console.log(data);
            const dataI = [];
            if (data) {
                data.serie.forEach(element => {
    
                })
            }
            //const response = await Indicadores.deleteMany({tipo:{ $regex: new RegExp(type, 'i') },anio:year});
    
            //const insert = await Indicadores.insertMany(dataI);
            return res.status(200).json({ code: 200, status: true, payload: data })
        }catch(e){
            return res.status(500).json(e);
        }
       
    }


    static FeriadoLegalR = async (req, res) => {
        try{
     
            const url = `https://apis.digital.gob.cl/fl/feriados`;
            const { data } = await axios.get(url);
   
            const response = await FeriadoLegal.deleteMany();
    
            const insert = await FeriadoLegal.insertMany(data);
            return res.status(200).json({ code: 200, status: true, payload: data })
        }catch(e){
            return res.status(500).json(e);
        }
       
    }


    static UsuarioR = async (req, res) => {
        try {
            // const body = new FormData();
            // body.append("opcion","usuario");

            // console.log(body);
            // const url = `https://portaldesoluciones.cl/models/process/admin.php`;
            // const { data } = await axios.post(url,body)

            const { body } = req;
            const { data } = body;

            const user = [];

            data.forEach(x => {
                user.push({
                    nombre: x.nombre,
                    apellido: x.apellido,
                    rut: x.rut,
                    email: x.email,
                    direccion: x.direccion,
                    telefono: x.telefono,
                    password: x.password,
                    hashpassword: encrypPassword(x.password),
                    resetPasswordLink: "",
                    avatar: `https://portaldesoluciones.cl/${x.url_foto}`,
                    rol: x.perfil,
                    razonsocial: x.razonsocial,
                    numerodecontrato: x.numero_de_contrato,
                    fechainicio: x.fechainicio,
                    fechavencimiento: x.fechavencimiento,
                    descripcion: x.descripcion,
                    conexiones: {},
                    inicioconexion: x.inicioconexion,
                    ultimaconexion: x.ultimaconexion,
                    conexion: x.conexion,
                    visitas: x.visitas,
                    notificacion: x.notificacion,
                    estado: x.estado !== 'Activo' ? false : true,
                    ultimaip: x.ultimaip,
                    cookie: x.cookie,
                })
            })


            const r = await Usuario.deleteMany();

            const response = await Usuario.insertMany(user);
          

            return res.status(200).json({ code: 200, status: true, payload: data })
        } catch (e) {

            console.log("llego al error--->", e)
            return res.status(400).json(e)
        }

    }


    static NoticiasR = async (req, res) => {
        try {
            // const body = new FormData();
            // body.append("opcion","usuario");

            // console.log(body);
            // const url = `https://portaldesoluciones.cl/models/process/admin.php`;
            // const { data } = await axios.post(url,body)

            const { body } = req;
            const { data } = body;

            const user = [];

            data.forEach(x => {
                user.push({
                    id: x.id_usuario,
                    nombre: x.nombre,
                    apellido: x.apellido,
                    rut: x.rut,
                    email: x.email,
                    direccion: x.direccion,
                    telefono: x.telefono,
                    password: x.password,
                    hashpassword: x.password,
                    resetPasswordLink: "",
                    avatar: `https://portaldesoluciones/${x.url_foto}`,
                    rol: x.perfil,
                    razonsocial: x.razonsocial,
                    numerodecontrato: x.numero_de_contrato,
                    fechainicio: x.fechainicio,
                    fechavencimiento: x.fechavencimiento,
                    descripcion: x.descripcion,
                    conexiones: {},
                    inicioconexion: x.inicioconexion,
                    ultimaconexion: x.ultimaconexion,
                    conexion: x.conexion,
                    visitas: x.visitas,
                    notificacion: x.notificacion,
                    estado: x.estado !== 'Activo' ? false : true,
                    ultimaip: x.ultimaip,
                    cookie: x.cookie,
                })
            })


            const r = await Noticias.deleteMany();

            console.log("r --->",r);

            const response = await Noticias.insertMany(user);

            return res.status(200).json({ code: 200, status: true, payload: data })
        } catch (e) {

            console.log("llego al error--->", e)
            return res.status(400).json(e)
        }

    }
    
}

module.exports = RespaldoController;