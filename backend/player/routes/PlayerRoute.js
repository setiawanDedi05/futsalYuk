const express = require("express")
const router = express.Router()
const playerController = require("../controllers/PlayerController")

router.get("/", playerController.getAllPlayers);
router.get("/:id", playerController.getPlayerById);
router.post("/", playerController.registerPlayer);
router.put("/:id", playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);

module.exports = router