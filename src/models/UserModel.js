const mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	Schema = mongoose.Schema;
// -------------------------------- \\

var UserSchema = new Schema({
	username: {
		type: String,
		trim: true,
		unique: true
	},
	password: {
		type: String
	}
});

UserSchema.pre('save', async function (next) {
	const user = this;
	const hashedPwd = await bcrypt.hash(user.password, 10);
	console.log('UserSchema PRE: ' + hashedPwd);
	user.password = hashedPwd;
	next();
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
