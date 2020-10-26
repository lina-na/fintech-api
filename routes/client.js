const express = require("express");
const router = express.Router();
const { clientApi } = require("../api");

router.post("/", clientApi.createClient);

module.exports = router;
