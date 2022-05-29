const jwt = require('jsonwebtoken')
const createHttpError= require('http-errors')
const SECRET_KEY= require('../utils/secret')

const verifyJWT = (req, res, next) =>{
    const token= req.headers.token;
    let decodedToken;
    try{
        decodedToken= jwt.verify(token,SECRET_KEY)
        if(decodedToken.id != req.body.creator){
            res.status(403).json({body:{ error: "Not allowed"}})
            return next()
        }
    } catch(err){
        res.status(403).json({body:{ error: err}}) //Forbidden
        return next()
    }
    if(decodedToken){
        return next();
    }
}

module.exports = verifyJWT;