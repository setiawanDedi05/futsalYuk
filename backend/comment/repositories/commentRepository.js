class CommentRepository{
    constructor(db){
        this.db = db;
    }

    async create(comment){
        return await comment.save();
    }
}

module.exports = CommentRepository;