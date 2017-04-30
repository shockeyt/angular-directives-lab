var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cards');


module.exports.Question = require('./question.js');