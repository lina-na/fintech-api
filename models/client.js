const Joi = require('joi');
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
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
	address: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 255,
	},
	phone: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 25
	},
	ssn: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 255,
		unique: true
	}
});

const Client = mongoose.model('Client', clientSchema);

const validateClient = (client) => {
	const schema = Joi.object({
		firstname: Joi.string().min(4).max(50).required(),
		surname: Joi.string().min(4).max(50).required(),
		address: Joi.string().min(4).max(255).required(),
		phone: Joi.string().min(4).max(25).required(),
		ssn: Joi.string().min(4).max(255).required()
	});

	return schema.validate(client);
}

exports.Client = Client;
exports.validate = validateClient;
