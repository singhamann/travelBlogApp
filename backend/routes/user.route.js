const express = require('express')
const router= express.Router()
const userController= require('../controllers/user.controller')
const {body} = require('express-validator')

const signUpValidations =[
    body('email').isEmail(),
    body('password').isLength({min: 8}),
    body('name').not().isEmpty()
]

router.get('/',userController.index);
router.get('/getAllUsers',userController.getAllUsers)
router.get('/getUser/:userId',userController.getUser)
router.post('/signup',signUpValidations, userController.signUp)
router.get('/signIn/:email/:password',userController.signIn)


module.exports= router;