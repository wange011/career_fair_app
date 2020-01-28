const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: String,
    salt: String
});

const Salt = mongoose.model('Salt', schema);
module.exports = Salt;