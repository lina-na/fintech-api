const express = require("express");
const router = express.Router();
const auth = require('../helpers/middleware')
const { clientApi } = require("../api");


router.post("/", clientApi.createClient);
router.get("/", auth, clientApi.getClients);
router.patch("/:id", auth, clientApi.updateClient)
router.delete("/:id", auth, clientApi.deleteClient)

module.exports = router;
