const express = require("express");
const router = express.Router();
const { userApi } = require("../api");

router.post("/signup", userApi.signUp);

module.exports = router;
