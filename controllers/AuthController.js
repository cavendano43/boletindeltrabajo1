const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const _ = require('lodash');
////////////// helpers ///////////////////////
const { enviarCorreo,sendMail } = require('../helpers/Nodemailer');
///////////// models ////////////////////////
const Usuario = require('../models/Usuario');

class AuthController{
    
    static singIn = async(req,res)=>{
        const { email, password } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const firstError = errors.array().map(error => error.msg)[0];
            return res.status(422).json({
            errors: firstError
            });
        }else{
            Usuario.findOne({
                email
            }).exec(async (err, user) => {
            
                if (err || !user) {
                    return res.status(400).json({
                    "res":false,
                    "message":"El usuario con ese correo electrónico no existe. Por favor regístrese",
                    errors: 'El usuario con ese correo electrónico no existe. Por favor regístrese'
                    });
                }
                // authenticate
                if (!user.authenticate(password)) {
                    return res.status(400).json({
                    "res":false,
                    "message":"Correo electrónico y contraseña no coinciden",
                    errors: 'Correo electrónico y contraseña no coinciden'
                    });
                }
                const id=user._id;
                const token = jwt.sign(
                    {
                    _id: user._id,
                    nombre:user.nombre,
                    apellido:user.apellido,
                    email: user.email[0],
                    avatar: user.avatar,
                    razonsocial: user.razonsocial,
                    estado: user.estado,
                    visitas: user.visitas,
                    rol: user.rol,
                    contrasena:user.contrasena
                    },
                    process.env.JWT_SECRET,
                    {
                    expiresIn: '7d'
                    }
                );
                const resp=await Usuario.findByIdAndUpdate(id,{ $inc: {visitas:1}});
                return res.status(200).json({"token":token});

            });
        }

    }

    static singUp = async(req,res)=>{
        const { nombre, apellido, razonsocial, rut, email, telefono, direccion, region, comuna } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const firstError = errors.array().map(error => error.msg)[0];
            return res.status(422).json({
              errors: firstError
            });
        }else{
            User.findOne({
                email
            }).exec((err, user) => {
                
            })
        }
    }

    static forgotPassword = (req, res) => {
        const { email } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const firstError = errors.array().map(error => error.msg)[0];
            return res.status(422).json({
              errors: firstError
            });
        }else{
            Usuario.findOne(
            {
                  email
            },(err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                      "res":false,
                      "message":"El usuario con ese correo electrónico no existe",
                       error: 'El usuario con ese correo electrónico no existe'
                    });
                }
                const token = jwt.sign(
                    {
                      _id: user._id
                    },
                    process.env.JWT_RESET_PASSWORD,
                    {
                      expiresIn: '10m'
                    }
                );
               
                const asunto=`Enlace de restablecimiento de contraseña`;
                const mensaje= `
                <h1>Utilice el siguiente enlace para restablecer su contraseña</h1>
                <p><a href='${process.env.CLIENT_URL}/autenticacion/reset-password/${token}'>${process.env.CLIENT_URL}/autenticacion/reset-password/${token}</a></p>
                <hr />
                <p>Este correo electrónico puede contener información sensible</p>
                <p>${process.env.CLIENT_URL}</p>
                `;

                return user.updateOne(
                    {
                      resetPasswordLink: token
                    },
                    (err, success) => {
                        if (err) {
                            console.log('RESTABLECER ERROR DE ENLACE DE CONTRASEÑA', err);
                            return res.status(400).json({
                              error:
                                'Error de conexión a la base de datos en la solicitud de contraseña olvidada del usuario'
                            });
                        }else{
                            const response=sendMail(email,asunto,mensaje);
                            res.json({
                            "res":response,
                            "message":"Por favor verifique su email"
                            });
                        }
                    }

                );    
            })
        }
    }

    static resetPasswordController = (req, res) => {
        const errors = validationResult(req);
        const { resetPasswordLink, newPassword } = req.body;
    
        if (!errors.isEmpty()) {
            const firstError = errors.array().map(error => error.msg)[0];
            return res.status(422).json({
            errors: firstError
            });
        } else {
            if (resetPasswordLink) {
                jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(
                    err,
                    decoded
                ){
                    if (err) {
                        return res.status(400).json({
                          error: 'Enlace caducado. Intentar otra vez'
                        });
                    }
                })

                Usuario.findOne(
                    {
                      resetPasswordLink
                    },
                    (err, user) => {
                      if (err || !user) {
                        return res.status(400).json({
                          error: 'Algo salió mal. Intenta más tarde'
                        });
                      }
          
                      const updatedFields = {
                        password: newPassword,
                        resetPasswordLink: ''
                      };
          
                      user = _.extend(user, updatedFields);
          
                      user.save((err, result) => {
                        if (err) {
                          return res.status(400).json({
                            error: 'Error al restablecer la contraseña del usuario'
                          });
                        }
                        res.status(200).json({
                          "res":true,
                          message: `¡Genial! Ahora puede iniciar sesión con su nueva contraseña`
                        });
                      });
                    }
                );
            }
        }
    }
    static refresToken = async(req,res)=>{
      const {token} = req.body;
      const refresToken = req.headers;
    
      if(!(refresToken)){
        return res.status(400).json({
          error: 'Algo salió mal. Intenta más tarde'
        });
      }

      try{
        const veryfyResult=jwt.verify(token,process.env.JWT_SECRET);
        const user=await Usuario.findById(veryfyResult._id);
        if(user){
            const token = jwt.sign(
              {
              _id: user._id,
              nombre:user.nombre,
              apellido:user.apellido,
              email: user.email[0],
              avatar: user.avatar,
              razonsocial: user.razonsocial,
              estado: user.estado,
              visitas: user.visitas,
              rol: user.rol,
              contrasena:user.contrasena
              },
              process.env.JWT_SECRET,
              {
              expiresIn: '7d'
              }
          );
          res.status(200).json({"token":token});
        }
       
      }catch(error){
         res.status(200).json({"res":false,"title":error,"message":"error de token"})
      }
    }

}

module.exports = AuthController;