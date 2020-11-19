var mongoose = require('mongoose');

var RevisionSchema = new mongoose.Schema({
	level1: String,
	level2: String,
	level3: String,
	revision: Number,
	information: Array
}, {collection: 'RevisionSchema'});

var revisionSch = mongoose.model('RevisionSchema',RevsionSchema);
module.exports = revisionSch;
