class PostService {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async getAllPost() {
    return await this.postRepository.findAll();
  }

  async likePostById(postId, userId) {
    const findedPost = await this.postRepository.findById(postId);
    const likeIndex = findedPost.likes.indexOf(userId);
    if (likeIndex === -1) {
      findedPost.likes.push(userId);
    } else {
      findedPost.likes.splice(likeIndex, 1);
    }
    return findedPost.save();
  }

  async create(post) {
    return await this.postRepository.create(post);
  }

  async updatePostById(id, post) {
    return await this.postRepository.update(id, post);
  }

  async deletePostById(id) {
    return await this.postRepository.destroy(id);
  }
}

module.exports = PostService;
