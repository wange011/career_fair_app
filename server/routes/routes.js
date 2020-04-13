const express = require('express');
const router = express.Router();

const Company = require('../models/Company');
// Get all companies
router.get('/companies', (req, res) => {

    Company.find({}, (err, companies) => {
        res.send(companies);
    });

})

// To-Do: Server Side Authentication
router.post('/edit_company', (req, res) => {

    const company = JSON.parse(req.body.company);
    
    Company.find( { name: company.name }, (err, companiesFound) => {

    }).then( (companiesFound) => {

        if (companiesFound.length > 0) {
            Company.findByIdAndUpdate({ _id: companiesFound[0]._id }, company, {new: true}, (err, new_company) => {
                if (err) return handleError(err);
                return res.send(new_company);
            });

        }

    });

})

router.post('/add_company', (req, res) => {

    const company = JSON.parse(req.body.company);
    
    Company.find( { name: company.name }, (err, companiesFound) => {

    }).then( (companiesFound) => {

        if (companiesFound.length > 0) {
            
            return res.send(company.name + " already exists");

        } else {

            Company.create(company, (err, company) => {
                if (err) return handleError(err);
                return res.send(company);
            });

        }

    });

})

// Login
const { SHA256 } = require("sha2");
const User = require('../models/User');
const Salt = require('../models/Salt');
const AccessCode = require('../models/AccessCode');

router.post('/login', (req, res) => {

    var username = req.body.username;

    // Get the salt
    Salt.find({ username: username }, (err, users) => {
    
    }).then( (users) => {

        if (users.length < 1) {
            return res.send(401);
        }


        const salt = users[0].salt;
        var password = req.body.password;
        var passwordHash = SHA256(password + salt).toString("base64");

        // Check if the passwordHash is in database
        User.find({ username: username, passwordHash: passwordHash }, (err, users) => {

            if (users.length < 1) {

                return res.send(401);

            } else {

                var userJSON = {
                    favorites: users[0].favorites,
                    notes: users[0].notes,
                    username: users[0].username,
                    userType: users[0].userType,
                    id: users[0]._id
                }

                return res.send(userJSON);

            }

        });

    });

})

// To-Do: Authorization for registering admin users
router.post('/register', (req, res) => {

    let username = req.body.username.trim();
    let code = req.body.code;
    var password = req.body.password;

    if (username.length < 1) {
        return res.send("No username");
    }

    if (password.length < 1) {
        return res.send("No password");
    }

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

            var passwordHash = SHA256(password + salt).toString("base64");

            var userType = "student";

            if(code.length > 0) {
                AccessCode.find({ code: code }, (err, userCode) => {

                }).then((userCode) => {
                    if (userCode.length > 0) {

                        userType = "tempAdmin";

                        // Add the user to the users collection
                        User.create({ username: username, passwordHash: passwordHash, userType: userType, favorites: [], notes: {} 
                        }, (err, user) => {
                            
                            if (err) return handleError(err);
                            
                            var userJSON = {
                                favorites: user.favorites,
                                notes: {},
                                username: user.username,
                                userType: user.userType,
                                id: user._id
                            }

                            return res.send(userJSON);

                        });
                    } else {
                        return res.send("Access code not valid");
                    }
                })
            } else {
                // Add the user to the users collection
                User.create({ username: username, passwordHash: passwordHash, userType: userType, favorites: [], notes: {} 
                }, (err, user) => {
                    
                    if (err) return handleError(err);
                    
                    var userJSON = {
                        favorites: user.favorites,
                        notes: {},
                        username: user.username,
                        userType: user.userType,
                        id: user._id
                    }

                    return res.send(userJSON);

                });
            }

        }
    
    });

})

router.post('/get_access_code', (req, res) => {
    const username = req.body.username;

    AccessCode.find({ username: username }, (err, userCode) => {
        return res.send(userCode[0]);
    })

})


router.post('/access_code', (req, res) => {
    const username = req.body.username;
    const userType = req.body.userType;
    const code = req.body.code;

    if (userType == "admin") {
        AccessCode.find({ username: username }, (err, userCode) => {

        }).then((userCode) => {
            if (userCode.length >= 1) {
                AccessCode.findOneAndUpdate({ username: username}, { code: code }, {new: true}, (err, userCode) => {
                    return res.send(userCode);
                })
            } else {
                AccessCode.create({ username: username, code: code }, (err, userCode) => {
                    return res.send(userCode);
                })
            }
        })
    } else {
        return res.send("User Type not valid");
    }

})

// Favorites
router.post('/favorites', (req, res) => {

    const user = JSON.parse(req.body.user);
    const favorites = user.favorites;
    const id = user.id;
    
    User.find( { _id: id }, (err, users) => {

    }).then( (users) => {

        if (users.length > 0) {
            User.findByIdAndUpdate({ _id: id }, { favorites: favorites }, (err, user) => {
                if (err) return console.log(err);
            });
            
            return res.send("User updated");

        } else {

            return res.send("User does not exist");

        }

    });

})

// Admin statistics
// Keep track of the number of favorites for each company
router.get('/favorites_stat', (req, res) => {

    Company.find({}, (err, companies) => {
        
    }).then((companies) => {

        var favStat = {}

        for (var i = 0; i < companies.length; i++) {
            favStat[companies[i].name] = 0;
        }

        User.find({}, (err, users) => {

        }).then((users) => {

            for (var i = 0; i < users.length; i++) {
                const userFavorites = users[i].favorites;
                for (var j = 0; j < userFavorites.length; j++) {
                    favStat[userFavorites[j].name] += 1;
                }
            }

            return res.send(favStat);
        });

    });

})

router.post('/notes', (req, res) => {
    const userID = req.body.userID;
    const notes = req.body.notes;

    User.findByIdAndUpdate({ _id: userID }, { notes: notes }, (err, user) => {

        if (err) {
            return res.send(401);

        } else {

            return res.send(user);

        }

    });
})

module.exports = router;