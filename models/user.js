module.exports = class User {
  constructor(data) {
    this.id = data.id;
    this.user_name = data.user_name;
    this.user_email = data.user_email;
    this.description = data.description;
    this.num_of_followers = data.num_of_followers;
    this.update_at = data.update_at;
    this.join_at = data.join_at;
    this.user_image = data.user_image;
  }

  // Getters
  get id() {
    return this._id;
  }

  get user_name() {
    return this._user_name;
  }

  get user_email() {
    return this._user_email;
  }

  get description() {
    return this._description;
  }

  get num_of_followers() {
    return this._num_of_followers;
  }

  get update_at() {
    return this._update_at;
  }

  get join_at() {
    return this._join_at;
  }

  get user_image() {
    return this._user_image;
  }

  // Setters
  set id(value) {
    this._id = value;
  }

  set user_name(value) {
    this._user_name = value;
  }

  set user_email(value) {
    this._user_email = value;
  }

  set description(value) {
    this._description = value;
  }

  set num_of_followers(value) {
    this._num_of_followers = value;
  }

  set update_at(value) {
    this._update_at = value;
  }

  set join_at(value) {
    this._join_at = value;
  }

  set user_image(value) {
    this._user_image = value;
  }
}

// const userQuery = "select * from account";
// const rows = await db.query(userQuery, []);
// const userData = rows[0]; // Assuming the first row contains the user data
// const user = new User(userData);
// console.log(user);
