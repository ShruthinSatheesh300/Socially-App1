export const PostDto = function (data) {
  this.id = data._id;
  this.content = data.content;
  this.createdAt = data.createdAt;
  this.updatedAt = data.updatedAt;
};
