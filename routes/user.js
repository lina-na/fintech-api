const express = require("express");
const router = express.Router();
const { userApi } = require("../api");

router.post("/signup", userApi.signUp);
router.post("/login", userApi.signIn);

module.exports = router;
