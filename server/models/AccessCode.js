const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: String,
    code: String
});

const AccessCode = mongoose.model('AccessCode', schema);
module.exports = AccessCode;