const jsonwebtoken = require('jsonwebtoken');

exports.generateToken = (data)=>{
    return jsonwebtoken.sign(data, process.env.JWT_SECRET);
}