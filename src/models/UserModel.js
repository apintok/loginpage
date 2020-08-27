const mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	Schema = mongoose.Schema;
// -------------------------------- \\

var UserSchema = new Schema({
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},
	username: {
		type: String,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	}
});

UserSchema.pre('save', async function (next) {
	const user = this;
	
	const hashedPwd = await bcrypt.hash(user.password, 10);
	user.password = hashedPwd;

	next();
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
