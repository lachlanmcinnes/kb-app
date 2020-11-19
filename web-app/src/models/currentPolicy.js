var mongoose = require('mongoose');

var CurrentSchema = new mongoose.Schema({
	level1: String,
	level2: String,
	level3: String,
	revision: Number,
	information: Array
}, {collection: 'CurrentSchema'});

var currentSch = mongoose.model('CurrentSchema',CurrentSchema);
module.exports = currentSch;
