export const PostDto = function (data) {
  this.id = data._id;
  this.creator = data.creator;
  this.content = data.content;
  this.likes = data.likes;
  this.createdAt = data.createdAt;
  this.updatedAt = data.updatedAt;
};

export const LikesDto = function (data) {
  this.likes = data.likes;
};
