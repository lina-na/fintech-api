const { Client, validate } = require('../models/client');
const { encrypt, decrypt } = require('../helpers/crypto')

const createClient = async (req, res, next) => {
	try {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		let client = await Client.findOne({ phone: req.body.phone });
		if (client) return res.status(400).send('Client already register.');

		client = new Client(req.body);
		client.ssn = encrypt(req.body.ssn);

		await client.save();

		res.send({ message: "Application is accepted"});
	} catch (error) {
		next(error);
	}
};

const getClients = async (req, res, next) => {
	try {
		const clients = await Client.find();
		clients.map(async ( client ) => {
			client.ssn = decrypt(client.ssn);
		});

		res.send(clients)
	} catch (error) {
		next(error)
	}
};

const updateClient = async (req, res, next) => {
	try {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const client = await Client.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true});
		if(!client) return res.status(400).send("Client not found");

		res.send(client);
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
	getClients,
	updateClient,
	deleteClient
}