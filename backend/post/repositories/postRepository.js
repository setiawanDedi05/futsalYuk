const { Post } = require("../models/postModel");

class PostRepository {
    constructor(db) {
        this.db = db;
    }

    async findAll(){
        return await this.db.find();
    }

    async findById(id){
        return await this.db.findById(id);
    }

    async create(post){
        return await post.save();
    }

    async update(id, post){
        return await this.db.findByIdAndUpdate(id, post, {
            returnOriginal: false,
            runValidators: true
        })
    }

    async destroy(id){
        return await this.db.findByIdAndDelete(id)
    }
}

module.exports = PostRepository;