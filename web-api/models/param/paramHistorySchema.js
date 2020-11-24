const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    knowledgebase: Array,
    georisk: Array,
    prelimdesign: Array,
    engagement: Array,
    commitment: Array,
});