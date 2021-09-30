const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');
const crypto = require('crypto');


const usuarioSchema = new Schema({
    nombre:String,
    apellido:String,
    rut:String,
    email:Array,
    direccion:String,
    telefono:String,
    contrasena:String,
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    resetPasswordLink:{
      type:String,
      default: ''
    },
    avatar:String,
    rol:Number,
    razonsocial:String,
    numerodecontrato:String,
    fechainicio:String,
    fechavencimiento:String,
    descripcion:String,
    inicioconexion:String,
    ultimaconexion:String,
    conexion:Boolean,
    visitas:Number,
    notificacion:Number,
    estado:Boolean,
    ultimaip:String,
    conexiones:Array,
},{
    timestamps:true,
})

// virtual
usuarioSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// methods
usuarioSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};


module.exports = model('Usuario',usuarioSchema);