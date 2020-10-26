const express = require('express');
const app = express();

require('./startup/db')();



const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log("The server is listening on the port", port)
});
