const mongoose = require('mongoose');

const connectDB = async()=>{
   await mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true,
    }).then(db => console.log('Database esta conectada 1')).catch(err => console.log(err));
}


module.exports = connectDB;
