class PostRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    return await this.db.find();
  }

  async findById(id) {
    return await this.db.findById(id);
  }

  async create(post) {
    return await post.save();
  }

  async update(id, post) {
    return await this.db.findByIdAndUpdate(id, post, {
      returnOriginal: false,
      runValidators: true,
    });
  }

  async pushCommentInPost(postId, commentId) {
    return await this.db.findByIdAndUpdate(
      postId,
      {
        $push: { comments: commentId },
      },
      {
        new: true,
      }
    );
  }

  async popCommentInPost(postId, commentId) {
    return await this.db.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: commentId },
      },
      {
        new: true,
      }
    );
  }

  async destroy(id) {
    return await this.db.findByIdAndDelete(id);
  }
}

module.exports = PostRepository;

