const bcrypt = require('bcrypt');

const encrypt = async (field) => {
	const salt = await bcrypt.genSalt(10);

	return await bcrypt.hash(field, salt);
}

module.exports ={
	encrypt
}

