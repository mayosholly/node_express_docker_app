// import express
const express = require('express');

// import body parser for sending request
const bodyParser = require('body-parser');

// initialize express instance
const app = express();   

const postRoute = require('./routes/postRoutes');
const userRoute = require('./routes/userRoutes');
const imageRoute = require('./routes/image');
// use body parser for sending request
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'))

app.use('/posts', postRoute);
app.use('/users', userRoute);
app.use('/images', imageRoute);


module.exports = app;