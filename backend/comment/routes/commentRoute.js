const express = require("express");
const CommentRepository = require("../repositories/commentRepository");
const CommentService = require("../services/commentService");
const CommentController = require("../controllers/commentController");
const { Comment } = require("../models/commentModel");
const router = express.Router();

const commentRepository = new CommentRepository(Comment);
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

router.post("/", (req, res, next) => commentController.createComment(req, res, next));

module.exports = router;
