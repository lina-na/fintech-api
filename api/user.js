const {User, validate} = require('../models/user');
const config = require('config');
const jwt = require('jsonwebtoken')
const { encrypt, compare } = require('../helpers/bcrypt')

const signUp = async (req, res, next) => {
	try {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		let user = await User.findOne({ email: req.body.email });
		if (user) return res.status(400).send('User already register.');

		user = new User(req.body);
		user.password = await encrypt(user.password);

		await user.save();

		res.send({message: "User was created successfully"})
	} catch (error) {
		next(error);
	}
};

const signIn = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if(!user) return res.status(400).send('Email in not found');

		const validPass = compare(req.body.password, user.password);
		if(!validPass) return res.status(400).send('Invalid password');

		const token = jwt.sign({_id: user._id}, config.get('jwt'));
		delete user["_doc"].password;
		
		res.send({token, ...user["_doc"]});
	} catch (error) {
		next(error);
	}
};


module.exports = {
	signUp,
	signIn
}