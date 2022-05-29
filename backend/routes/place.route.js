const express = require('express')
const {body} = require('express-validator')
const router= express.Router()
const placeController= require('../controllers/place.controller')
const verifyJWT = require('../middleware/auth')
const placeValidations=[
    body('title').not().isEmpty(),
    body('description').not().isEmpty(),
    body('address').not().isEmpty(),
    body('creator').not().isEmpty()
]

router.get('/',placeController.index);
router.get('/getAllPlaces',placeController.getAllPlaces)
router.get('/getPlace/:creator',placeController.getplace);
router.post('/deletePlace',verifyJWT,placeController.deletePlace);
router.post('/createPlace',verifyJWT,placeValidations,placeController.createPlace)
router.post('/updatePlace', verifyJWT,placeController.updatePlace)
router.get('/getPlaceById/:placeId',placeController.getPlaceById)

module.exports= router;