const postRepository = require("../repositories/postRepository")

class PostService {
    async getAllPost(){
        return await postRepository.findAll();
    }

    async getPostById(id){
        return await postRepository.findById(id);
    }

    async create(create){
        return await postRepository.create(create);
    }

    async updatePostById(id, post){
        return await postRepository.update(id, post);
    }

    async deletePostById(id){
        return await postRepository.destroy(id);
    }
}

module.exports = new PostService()