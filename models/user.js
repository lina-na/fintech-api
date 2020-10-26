const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstname: {
		type:String,
		required: true,
		minlength: 4,
		maxlength: 50
	},
	surname: {
		type:String,
		required: true,
		minlength: 4,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 255
	}
});

userSchema.methods.generateAuthToken = function () {
	return jwt.sign({_id: this._id, isAdmin: this.isAdmin }, config.get('jwt'));
}

const User = mongoose.model('User', userSchema);

const validateAdmin = (user) => {
	const schema = Joi.object({
		firstname: Joi.string().min(4).max(50).required(),
		surname: Joi.string().min(4).max(50).required(),
		email: Joi.string().min(4).max(255).required().email(),
		password: Joi.string().min(4).max(255).required()
	});

	return schema.validate(user);
}

exports.User = User;
exports.validate = validateAdmin;
