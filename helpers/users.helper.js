const bcrypt = require('bcrypt');
const moment = require('moment');

exports.passwordCompare = (password,user) => {
    const hash = bcrypt.compareSync(password, user.hashpassword);
    return hash;
}

exports.encrypPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
} 

exports.compareUserVence = (fi,fv) => {
    const da = moment().format("YYYY-MM-DD")
    const fini = moment(new Date(fi)).format("YYYY-MM-DD")
    const venc = moment(new Date(fv)).format("YYYY-MM-DD")
    
    return moment(da).isBetween(fini,venc);
}