const express = require('express')
const app = express()
const port = 5000

var mongoose = require('mongoose');
//database user: 12dea96fec20593566ab75692c9949596833adc9, password: 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8
//To-Do: Use Environment Variable for this instead
mongoose.connect('mongodb://12dea96fec20593566ab75692c9949596833adc9:5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8@ds235418.mlab.com:35418/career_fair', {useNewUrlParser: true});
var db = mongoose.connection;

const CompanyList = require('./models/CompanyList');

app.get('/companyList', (req, res) => {

    CompanyList.find({}, (err, companyList) => {
        res.send(companyList[0]);
    });

})



app.listen(port, () => console.log(`Listening on port ${port}`))