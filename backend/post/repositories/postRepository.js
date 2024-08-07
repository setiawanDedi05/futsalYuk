const { Post } = require("../models/postModel");

class PostRepository {
    async findAll(){
        return await Post.find();
    }

    async findById(id){
        return await Post.findById(id);
    }

    async create(post){
        const newPost = new Post(post);
        return await newPost.save();
    }

    async update(id, post){
        return await Post.findByIdAndUpdate(id, post, {
            returnOriginal: false,
            runValidators: true
        })
    }

    async destroy(id){
        return await Post.findByIdAndDelete(id)
    }
}

module.exports = new PostRepository();