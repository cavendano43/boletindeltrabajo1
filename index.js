const express= require('express');
const Port = process.env.PORT || 4000;
const cors = require('cors');
const bodyParse = require('body-parser');

//// inicializacion///

const app= express();
require('dotenv').config();

const connectDB = require ('./config/database');
connectDB();

///routes /////

const rutaspublicas = require('./routes/publicas');

/// use ///
app.use(express.json({extended:true}))
app.use(cors());
app.use(rutaspublicas);

app.listen(Port ,()=>{
    console.log('Servidor iniciado',Port);
})