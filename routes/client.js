const express = require("express");
const router = express.Router();
const { clientApi } = require("../api");

router.post("/", clientApi.createClient);
router.get("/", clientApi.getClients);
router.patch("/:id", clientApi.updateClient)
router.delete("/:id", clientApi.deleteClient)

module.exports = router;
