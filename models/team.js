var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    name: String,
    position: String,
    years: String,
    high_school: String,
    NFL: String,
    NFLDraft: String,
    teamBody: String,
    author: {type: String, unique: true}
});

module.exports = mongoose.model('lsutigers', teamSchema);
