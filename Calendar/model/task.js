/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var taskSchema = new Schema({
		date : String,
		content : String
});

module.exports = mongoose.model('Task',taskSchema);