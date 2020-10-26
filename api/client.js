const { Client, validate } = require('../models/client');
const { encrypt } = require('../helpers/bcrypt')

const createClient = async (req, res, next) => {
	try {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		let client = await Client.findOne({ phone: req.body.phone });
		if (client) return res.status(400).send('Client already register.');

		client = new Client(req.body);
		client.ssn = await encrypt(req.body.ssn);

		await client.save();

		res.send(client)
	} catch (error) {
		next(error);
	}
};

const deleteClient = async (req, res, next) => {
	try {
		const client = await Client.findOneAndDelete({ _id: req.params.id});
		if(client) res.send({ message: "The customer removed"})
		else res.send({message: "Client not found"})
	} catch (error) {
		next(error);
	}
};


module.exports = {
	createClient,
	deleteClient
}