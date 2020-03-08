const express = require('express');
const routes = require('./routes/routes');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const app = express()
const port = 5000

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// CORS policy
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var mongoose = require('mongoose');
// database user: 12dea96fec20593566ab75692c9949596833adc9, password: 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8
// To-Do: Use Environment Variable for this instead
// Using mLab
mongoose.connect('mongodb://12dea96fec20593566ab75692c9949596833adc9:5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8@ds235418.mlab.com:35418/career_fair', {useNewUrlParser: true});

app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`))