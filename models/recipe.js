module.exports = class Recipe {
  constructor(data) {
    this.id = data.id;
    this.account_id = data.account_id;
    this.recipe_name = data.recipe_name;
    this.description = data.description;
    this.instruction = data.instruction;
    this.rating = data.rating;
    this.num_of_followers = data.num_of_followers;
    this.num_of_rating = data.num_of_rating;
    this.num_of_comments = data.num_of_comments;
    this.update_at = data.update_at;
    this.create_at = data.create_at;
    this.user_image = data.user_image;
    this.owner = data.owner;
  }

  // Getters
  get id() {
    return this.id;
  }

  get account_id() {
    return this.account_id;
  }

  get recipe_name() {
    return this.recipe_name;
  }

  get description() {
    return this.description;
  }

  get instruction() {
    return this.instruction;
  }

  get rating() {
    return this.rating;
  }

  get num_of_followers() {
    return this.num_of_followers;
  }

  get num_of_rating() {
    return this.num_of_rating;
  }

  get num_of_comments() {
    return this.num_of_comments;
  }

  get update_at() {
    return this.update_at;
  }

  get create_at() {
    return this.create_at;
  }

  get user_image() {
    return this.user_image;
  }

  get owner() {
    return this.owner;
  }

  // Setters
  set id(value) {
    this.id = value;
  }

  set account_id(value) {
    this.account_id = value;
  }

  set recipe_name(value) {
    this.recipe_name = value;
  }

  set description(value) {
    this.description = value;
  }

  set instruction(value) {
    this.instruction = value;
  }

  set rating(value) {
    this.rating = value;
  }

  set num_of_followers(value) {
    this.num_of_followers = value;
  }

  set num_of_rating(value) {
    this.num_of_rating = value;
  }

  set num_of_comments(value) {
    this.num_of_comments = value;
  }

  set update_at(value) {
    this.update_at = value;
  }

  set create_at(value) {
    this.create_at = value;
  }

  set user_image(value) {
    this.user_image = value;
  }

  set owner(value) {
    this.owner = value;
  }
}

