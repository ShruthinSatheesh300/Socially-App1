export const UserDto = function (data) {
  this.id = data._id;
  this.firstName = data.firstName;
  this.lastName = data.lastName;
  this.email = data.email;
  this.followers = data.followers;
  this.following = data.following;
  this.createdAt = data.createdAt;
};
