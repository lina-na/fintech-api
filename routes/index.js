const { Router } = require("express");
const publicRouter = Router();

publicRouter.use("/user", require("./user"));

module.exports = {
	publicRouter,
};
