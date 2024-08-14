const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const PostController = require('../controllers/postController')
const PostService = require('../services/postService')
const PostRepository = require('../repositories/postRepository');
const { Post } = require("../models/postModel");

const postRepository = new PostRepository(Post);
const postService = new PostService(postRepository);
const postController = new PostController(postService);

router.get("/", (req, res, next) => postController.getAllPost(req, res, next));
router.post("/", upload.single('media') , (req, res, next) => postController.createPost(req, res, next));
router.post("/:postId/like", (req, res, next) => postController.likePost(req, res, next));

module.exports = router