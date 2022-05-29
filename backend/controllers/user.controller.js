const User= require('../models/user.model')
const md5= require('md5')
const createHttpError = require('http-errors')
const { create } = require('../models/user.model')
const { validationResult }= require('express-validator')
const jwt = require('jsonwebtoken')
const SECRET_KEY= require('../utils/secret')

const index= (req,res)=>{
    res.send('/users was hit');
}

const getUser=  async(req,res)=>{
    const {userId}= req.params
    const gettingUser= await User.findById(userId) 
    // const name= gettingUser[0].name
    res.status(201).json({body: gettingUser.toObject()})
}

const getAllUsers = async (req,res) =>{
    const users= await User.find();
    res.status(201).json({body: { users }});
}

const signUp= async (req,res,next) =>{
    const validationErrors= validationResult(req)
    if(!validationErrors.isEmpty()){
        console.log(req.email);
        const error= createHttpError(400, validationErrors)
        res.status(400).json({body: {error}})
        return next();
    }

    const {name , email, password} = req.body;
    let existingUser;
    try{
        existingUser= await User.find({email});
    } catch(err){
        const error= createHttpError(500, 'Something Went Wrong')
        res.status(500).json({body: {error}})
        return next()
    }
    if (existingUser.length) {
        const error=  createHttpError(400, 'User Already Exists !')
        res.status(400).json({body: {error}});
        return next();
    }

    const userObj= new User({
        name, email, password: md5(password)
    });
    try{
        const userResult= userObj.save()
    } catch(err){
        const error= createHttpError(500, 'Something Went Wrong')
        res.status(500).json({body: {error}})
        return next()
    }
    const infoStoredInToken = {
        id: userObj.id,
        email: userObj.email,
        name: userObj.name
    };
    
    const token= jwt.sign(infoStoredInToken, SECRET_KEY, {expiresIn: '1h'})
    res.status(201).json({body: { user: userObj.toObject(), token}});
}

const signIn= async (req,res,next) =>{
    const {email, password} = req.params;
    let userExist;
    try{
        userExist= await User.find({email: email});
    } catch(err){
        const error= createHttpError(500, 'Something Went Wrong')
        res.status(500).json({body: {error}})
        return next()
    }
    if(userExist.length){
        found= await User.find({email: email, password: md5(password)})
        if (found.length){
            person= found[0]
            const infoStoredInToken= {
                id: person.id,
                email: person.email,
                name: person.name
            };
            const token= jwt.sign(infoStoredInToken, SECRET_KEY, {expiresIn: '10h'})
            res.status(201).send({ message: 'Logged In successfully', person: person.name, token, id: person.id})
            return next();
        }else{
            res.status(400).send({ message: 'Password is Wrong'})
            return next();
        }
    }else{ 
        const error=  createHttpError(400, 'User does not exist !')
        res.status(400).json({body: {error}});
        return next();
    }
    res.send("Error")
}


module.exports= {getAllUsers, index, getUser, signUp, signIn}