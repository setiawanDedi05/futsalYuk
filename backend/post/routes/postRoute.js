const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAllPost);
router.post("/", postController.createPost);

module.exports = router