const bcrypt = require('bcrypt');

const encrypt = async (field) => {
	const salt = await bcrypt.genSalt(10);

	return await bcrypt.hash(field, salt);
}

const compare = async (field, f) => {

	return await bcrypt.compare(field, f);
}

module.exports ={
	encrypt,
	compare,
}

