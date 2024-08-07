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
}

module.exports = new PostController();