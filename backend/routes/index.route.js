const express= require('express')
const router= express.Router()

router.get('/',(req,res) =>{
    res.setHeader('Content-type','text/html')
    res.send('<h1>Hello! Welcome to the App</h1>')
})

module.exports = router;