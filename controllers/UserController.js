const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const _ = require('lodash');
////////////// helpers ///////////////////////
const { encryptPassword,makeSalt } = require('../helpers/Password-helper');
const { enviarCorreo,sendMail } = require('../helpers/Nodemailer');
///////////// models ////////////////////////
const Usuario = require('../models/Usuario');

class UserController{
    static checkEmail = async(req,res)=>{
      const email=req.params.email ? req.params.email:"";
      const user = await Usuario.findOne({email:email});
   
      if(user){
        res.status(200).json({isExist:true});
      }else{
        res.status(200).json({isExist:false});
      }
    }
    static changePassword = async(req,res)=>{
      const {id,passwordCurrenty,password} = req.body;
      const contrasena=password;
      const salt=makeSalt();
      const hashed_password=encryptPassword(password,salt);
      
      const response = await Usuario.findByIdAndUpdate(id,{salt,contrasena,hashed_password});
      if(response){
        res.status(200).json({"res":true,"title":"Usuario modificado","message":"Contraseña modificada"})
      }else{
        res.status(500).json({"res":false,"title":"Error al modificar usuario","message":"Error al modificar contraseña"});
      }
    }

    static getProfile = async(req,res)=>{
        const id=req.params.id;
        const user=await Usuario.findById(id);
        if(user){
          res.status(200).json(user);
        }else{
          res.status(404).send({errors:["No se encuentra esa Publicacíon"]});
        }
    }
    static putProfile = async(req,res)=>{
        const {id,nombre,apellido,rut,numerodecontrato,razonsocial,email,direccion,descripcion} = req.body;
        const response = await Usuario.findByIdAndUpdate(id,{nombre,apellido,rut,numerodecontrato,razonsocial,email,direccion,descripcion});
 
        if(response){
          res.status(200).json({"res":true,"title":"Usuario modificado","message":"Usuario modificado"});
        }else{
          res.status(500).json({"res":false,"title":"Error al modificar usuario","message":"Error al modificar usuario"});
        }
        
    }
    static deleteAvatar = async(req,res)=>{
      const id = req.body._id;
      const avatar=`assets/images/avatar/img12.jpg`;
   
      const response = await Usuario.findByIdAndUpdate(id,{avatar});
      if(response){
        res.status(200).json({"res":true,"title":"Usuario modificado","message":"Usuario modificado"});
      }else{
        res.status(500).json({"res":false,"title":"Error al modificar usuario","message":"Error al modificar usuario"});
      }
    }
    static putAvatar = async(req,res)=>{
      const id=req.body.id;
      let avatar;
      if(req.file){
        const filename=req.file.filename;
        avatar = `assets/storage/avatar/${filename}`;
        const response = await Usuario.findByIdAndUpdate(id,{avatar});
        res.status(200).json({"res":true,"title":"Avatar modificado","message":"Usuario modificado"});
      }else{
        res.status(500).json({"res":false,"title":"Error al modificar usuario","message":"Error al modificar usuario"});
      }
    }
}

module.exports = UserController;