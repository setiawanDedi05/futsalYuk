const { Post } = require("../models/postModel");
const postService = require("../services/postService")

class PostController {
    async getAllPost(_req, res, next){
        try {
            const posts = await postService.getAllPost();
            res.status(200).json({
                data: posts
            });
        } catch (error) {
            next(error);
        }
    }

    async createPost(req, res, next) {
        const { userId, content, media } = req.body;
        const newPost = new Post({ userId, content, media, createdAt: new Date(), updatedAt: new Date() });
        try {
            const response = await postService.create(newPost);
            res.status(201).json({ data: response, message: "post created" });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PostController();