class UserDTO{
  constructor(user){
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.role = user.isAdmin;
      this.cart=user.cartID
  }

}

module.exports = UserDTO;