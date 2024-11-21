const express = require('express')
const app = express()
const mongoose= require('mongoose')
const userRouter = require('./routes/user.route')
const placeRouter= require('./routes/place.route')
const indexRouter= require('./routes/index.route')
const bodyParser =require('body-parser')
const cors = require('cors')

const URL= process.env.MONGODB_URL || 'mongodb://localhost:27017/travelBlog'
mongoose.connect(URL).then(() =>{
    console.log('Connection Successful!');
},(err) =>{
    console.log('Connection Error',err)
})

const PORT = process.env.PORT || 5001

app.use(cors())
app.use(bodyParser.urlencoded({extended :false}));

app.use('/',indexRouter);
app.use('/users',userRouter);
app.use('/places',placeRouter)

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is busy. Either:
        1. Stop the other process using this port
        2. Use a different port by setting the PORT environment variable`);
    } else {
        console.log('Server error:', err);
    }
});