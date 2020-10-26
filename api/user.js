const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');

const signUp = async (req, res, next) => {
	try {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		let user = await User.findOne({ email: req.body.email });
		if (user) return res.status(400).send('User already register.');

		user = new User(req.body);

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
		await user.save();

		res.send(user)
	} catch (error) {
		next(error);
	}
};

module.exports = {
	signUp
}