const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    userId: String,
    username: String,
    password: String,
    department: String,
}));