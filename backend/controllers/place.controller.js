const Place= require('../models/place.model')
const User= require('../models/user.model')
const {validationResult}= require('express-validator')
const createHttpError= require('http-errors')
const mongoose= require('mongoose')

const index =(req,res) =>{
    res.send('/places was hit');
}

const getAllPlaces = async(req,res) =>{
    const places= await Place.find();
    res.status(201).json({body: {places}})
}
const getPlaceById= async(req,res) =>{
    const {placeId} = req.params;
    const place = await Place.findById(placeId)
    res.status(201).json({body: place})
}

const getplace = async (req,res) =>{
    const {creator} = req.params;
    const place= await Place.find({creator: creator})
    res.status(201).json({body: place})
}

// const getPlacebyPlaceId = async (req)

const deletePlace = async (req,res,next) =>{
    const {placeId, creator} = req.body
    // let existingUser;
    // try{
    //     existingUser= await User.findById(creator);
    // } catch(err){
    //     const error= createHttpError(500, 'Something Went Wrong 1')
    //     res.status(500).json({body: {error}})
    //     return next()
    // }
    // if (!existingUser) {
    //     const error=  createHttpError(400, 'User does not exist')
    //     res.status(400).json({body: {error}});
    //     return next();
    // }
    let existingUser;
    try{
        existingUser= await User.findById(creator);
    } catch(err){
        res.status(500).send("Something Went Wrong")
        return next()
    }

    oldPlace= await Place.findById(placeId)
    try{
        const session= await moongoose.startSession();
        session.startTransaction();
        await oldPlace.remove({session}) 
        existingUser.places.pull(oldPlace);
        await existingUser.save({session});
        await session.commitTransaction();
        session.endSession();
    } catch(err){
        const error= createHttpError(500, 'Something Went Wrong 2')
        res.status(500).json({body: {error}})
        return next()
    }
    res.status(201).send('Place Deleted Successfully !!')
}

const createPlace = async (req, res, next) =>{
    const {title, description, address, image, creator} = req.body;
    
    const validationErrors= validationResult(req)
    if(!validationErrors.isEmpty()){
        const error= createHttpError(400, validationErrors)
        res.status(400).json({body: {error}})
        return next();
    }
    let user;
    try{
        user= await User.findById(creator);
        // const isEmpty = Object.keys(user).length ===0
        // if(isEmpty){
        //     res.status(403).json({body: {error: "User with the creator id does not exists"}})
        //     return next()
        // }
    } catch(err){
        res.status(500).send("Something Went Wrong")
        return next()
    }
    // let existingUser;
    // try{
    //     existingUser= await User.findById(creator);
    // } catch(err){
    //     const error= createHttpError(500, 'Something Went Wrong 1')
    //     res.status(500).json({body: {error}})
    //     return next()
    // }
    // if (!existingUser) {
    //     const error=  createHttpError(400, 'User does not exist')
    //     res.status(400).json({body: {error}});
    //     return next();
    // }
    const newPlace = new Place({title, description, address, image, creator}) ;

    try{
        const session= await moongoose.startSession();
        session.startTransaction();
        await newPlace.save({session}) 
        user.places.push(newPlace);
        await user.save({session});
        await session.commitTransaction();
        session.endSession();
    } catch(err){
        console.log(err)
        const error= createHttpError(500, 'Something Went Wrong 2')
        res.status(500).json({body: {error}})
        return next()
    }
    res.status(201).json({body: {place: newPlace.toObject() }})
}

const updatePlace = async (req, res, next) =>{
    const { placeID , creator, title, description, address, image} = req.body;
    let place= await Place.findById(placeID)
    if(place===null){
        res.status(403).json({body: {error: "Place Id is wrong"}})
        return next()
    }
    const updatedPlace = await Place.findByIdAndUpdate(placeID, { description, address, image, title })
    res.status(201).json({body: {place: 'Place is Updated' }})
}

module.exports = { getAllPlaces, index, getplace, deletePlace, createPlace, updatePlace,getPlaceById};