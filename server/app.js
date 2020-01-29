const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


var mongoose = require('mongoose');
// database user: 12dea96fec20593566ab75692c9949596833adc9, password: 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8
// To-Do: Use Environment Variable for this instead
// Using mLab
mongoose.connect('mongodb://12dea96fec20593566ab75692c9949596833adc9:5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8@ds235418.mlab.com:35418/career_fair', {useNewUrlParser: true});

const Company = require('./models/Company');

// Get all companies
app.get('/companies', (req, res) => {

    Company.find({}, (err, companies) => {
        res.send(companies);
    });

})


app.put('/companies', (req, res) => {

    const company = JSON.parse(req.body.company);
    
    Company.find( { name: company.name }, (err, companiesFound) => {

    }).then( (companiesFound) => {

        if (companiesFound.length > 0) {
            Company.findByIdAndUpdate({ _id: companiesFound[0]._id }, company, (err, company) => {
                if (err) return handleError(err);
            });
            
            return res.send(company.name + " updated");

        } else {

            Company.create(company, (err, company) => {
                if (err) return handleError(err);
            });

            return res.send(company.name + " added");

        }

    });

})


// Login
const { SHA256 } = require("sha2");
const User = require('./models/User');
const Salt = require('./models/Salt');

app.get('/login', (req, res) => {

    var username = req.body.username;

    // Get the salt
    Salt.find({ username: username }, (err, users) => {
    
    }).then( (users) => {

        if (users.length < 1) {
            return res.send("No such user");
        }


        const salt = users[0].salt;
        var password = req.body.password;
        var passwordHash = SHA256(password + salt).toString("base64");
        console.log(salt)

        // Check if the passwordHash is in database
        User.find({ username: username, passwordHash: passwordHash }, (err, users) => {

            if (users.length < 1) {

                return res.send(401);

            } else {

                var userJSON = {
                    favorites: users[0].favorites,
                    userType: users[0].userType,
                    id: users[0]._id
                }

                return res.send(userJSON);

            }

        });

    });

})

app.post('/register', (req, res) => {

    let username = req.body.username.trim();

    // Make sure username is not already in the database
    User.find({ username: username }, (err, users) => {
        
        if (users.length > 0) {
        
            return res.send("User Already Exists");
        
        } else {
            
            let salt = Math.random().toString(36).substring(8);

            // Add the salt to the salts collection
            Salt.create({ username: username, salt: salt}, (err, salt) => {
                if (err) return handleError(err);
            });

            var password = req.body.password;
            var passwordHash = SHA256(password + salt).toString("base64");

            var userType = req.body.userType;

            // Add the user to the users collection
            User.create({ username: username, passwordHash: passwordHash, userType: userType, favorites: [] 
            }, (err, user) => {
                
                if (err) return handleError(err);
                
                var userJSON = {
                    favorites: user.favorites,
                    userType: user.userType,
                    id: user._id
                }

                return res.send(userJSON);
            
            });

        }
    
    });

})

// Favorites
app.put('/favorites', (req, res) => {

    const user = JSON.parse(req.body.update);
    const favorites = user.favorites;
    const id = user.id;
    
    User.find( { _id: id }, (err, users) => {

    }).then( (users) => {

        if (users.length > 0) {
            User.findByIdAndUpdate({ _id: id }, { favorites: favorites }, (err, user) => {
                if (err) return handleError(err);
            });
            
            return res.send("User updated");

        } else {

            return res.send("User does not exist");

        }

    });

})

// Static variable for statistics, update when a user favorites
// Admin Statistics

app.listen(port, () => console.log(`Listening on port ${port}`))