const express = require("express")
const router = express.Router()
const playerController = require("../controllers/PlayerController")

router.get("/", playerController.getAllPlayers);
router.get("/:id", playerController.getPlayerById)

module.exports = router