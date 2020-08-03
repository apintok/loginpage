const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		trim: true,
		unique: true
	},
	password: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
