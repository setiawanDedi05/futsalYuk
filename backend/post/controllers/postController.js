const { Post } = require("../models/postModel");

class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  async getAllPost(_req, res, next) {
    try {
      const posts = await this.postService.getAllPost();
      res.status(200).json({
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  }

  async createPost(req, res, next) {
    const { userId, content } = req.body;
    const media = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({
      userId,
      content,
      media,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    try {
      const response = await this.postService.create(newPost);
      res.status(201).json({ data: response, message: "post created" });
    } catch (error) {
      next(error);
    }
  }

  async likePost(req, res, next) {
    const { userId } = req.body;
    const { postId } = req.params;

    try {
      const response = await this.postService.likePostById(postId, userId);
      res.status(201).json({ data: response, message: "like" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
