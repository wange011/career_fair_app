const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    companies: [{
        day: String,
        positions_offered: String,
        overview: String,
        name: String,
        image: String,
        degree_levels: String,
        sponsorships: String
    }]
});

const CompanyList = mongoose.model('CompanyList', schema, 'companyList');
module.exports = CompanyList;