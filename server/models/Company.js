const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    
    day: String,
    positions_offered: String,
    overview: String,
    name: String,
    image: String,
    degree_levels: String,
    sponsorships: String
    
});

// Pass in the name of the collection
// mongoose will automatically look for collection with name: lowercase + plural form of first parameter
const Company = mongoose.model('company', schema, 'companies');
module.exports = Company;