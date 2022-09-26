const express= require('express');
const Port = process.env.PORT || 4000;
const cors = require('cors');
const { logger } = require('./config/pino');
//// inicializacion///
const app= express();
require('dotenv').config({path:'variables.env'});
const connectDB = require ('./config/database');
connectDB();
///routes /////
const rutaspublicas = require('./routes/publicas');
const rutasauth = require('./routes/auth');
const rutasprivadas = require('./routes/privadas');
/// use ///
app.use(express.json({extended:true}))
app.use(cors());
app.use(rutaspublicas);
app.use('/auth',rutasauth);
app.use('/admin',rutasprivadas);

app.listen(Port ,()=>{
    logger.info(`Servidor iniciado ${Port}`);
})