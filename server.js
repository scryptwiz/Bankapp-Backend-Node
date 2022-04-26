const jwt = require('jsonwebtoken')
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 4500;
const cors = require('cors');
const mongoose = require('mongoose')
const routes = require('./Routes/appRoutes')
app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

// Mongoose
const URI = process.env.MONGOS_URI
mongoose.connect(URI, (err)=> {
    {!err ? console.log("Connected Successfully") : console.log(err);}
})
mongoose.Promise = global.Promise;

// route
app.use('/api', routes)

app.get('/', (req, res)=>{
    res.send('Hello World')
})

app.listen(PORT, ()=>{
    console.log(`You are connected to port ${PORT}`);
})