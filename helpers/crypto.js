const crypto = require('crypto-js');

const encrypt = (text) => {
	return crypto.AES.encrypt(text, 'secret key 123').toString();
}

const decrypt = (text) => {
	const bytes  = crypto.AES.decrypt(text, 'secret key 123');
	return bytes.toString(crypto.enc.Utf8);
}

module.exports ={
	encrypt,
	decrypt
}