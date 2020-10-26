const { Router } = require("express");
const publicRouter = Router();

publicRouter.use("/user", require("./user"));
publicRouter.use("/client", require("./client"));

module.exports = {
	publicRouter,
};
