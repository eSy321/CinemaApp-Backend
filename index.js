const config = require('config');
const mongoose = require('mongoose')
const Joi = require('joi')
const express = require('express')
const app = express()
const movies = require('./routes/movies')
const cors = require ("cors")
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

var email = 'kinocoderscamp@email.com'

if (!config.get('jwtPrivateKey')) {  //VerySecureJWTKey
    console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1);
}

mongoose.connect(config.get('db'), {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));