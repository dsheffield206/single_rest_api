var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    teamBody: String,
    name: String,
    position: String,
    years: String,
    high_school: String,
    NFL: String,
    NFLDraft: String
});

module.exports = mongoose.model('Player', teamSchema);
