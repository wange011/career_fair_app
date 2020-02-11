const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const company = new Schema({
    
    day: String,
    positions_offered: String,
    overview: String,
    name: String,
    image: String,
    degree_levels: String,
    sponsorships: String
    
});

const schema = new Schema({
    username: String,
    passwordHash: String,
    userType: String,
    favorites: [
        company
    ]
});

const User = mongoose.model('User', schema);
module.exports = User;