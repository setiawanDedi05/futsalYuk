const express = require("express")
const router = express.Router()
const playerController = require("../controllers/PlayerController");
const { updatePlayerValidator, registerUserValidator } = require("../helpers/playerValidation");
const validationHandler = require("../middleware/ValidationHandler");

router.get("/", playerController.getAllPlayers);
router.get("/:id", playerController.getPlayerById);
router.post("/", [registerUserValidator], validationHandler, playerController.registerPlayer);
router.put("/:id", [updatePlayerValidator], validationHandler, playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);

module.exports = router