class CommentRepository{
    constructor(db){
        this.db = db;
    }

    async create(comment){
        return await comment.save();
    }

    async delete(commentId){
        return await this.db.findByIdAndDelete(commentId);
    }
}

module.exports = CommentRepository;