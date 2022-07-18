export const UserDto = function (data) {
  this.id = data._id;
  this.firstName = data.firstName;
  this.lastName = data.lastName;
  this.email = data.email;
  this.createdAt = data.createdAt;
};
