const mongoose = require('mongoose');

module.exports = mongoose.model('Param', new mongoose.Schema({
    pit: String,
    location: String,
    knowledgebase: Array,
    georisk: Array,
    prelimdesign: Array,
    engagement: Array,
    commitment: Array,
    revision: Number
}));