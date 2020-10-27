const express = require('express');
const app = express();
const routers = require("./routes");
const cors = require('cors');

require('./startup/db')();

app.use(cors())
app.use(express.json());
app.use("/api", routers.publicRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log("The server is listening on the port", port)
});
