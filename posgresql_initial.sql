create table if not exists register_account (
  user_name varchar (50) not null,
  user_email varchar (100) not null,
  user_password varchar (100) not null,
  constraint unique_user_name unique (user_name, user_email)
);

create table if not exists firebase_messaging_token (
  firebase_token text not null,
  account_id int not null,
  constraint pk_firebase_token_account_id primary key (firebase_token, account_id)
);

create table if not exists account_login_status (
  user_email varchar (100) not null,
  session_token varchar (500) not null,
  constraint unique_login unique (user_email, session_token)
);

create table if not exists account (
  id serial primary key,
  user_name varchar (50) not null,
  user_email varchar (100) not null,
  user_password varchar (150) not null,
  description varchar (100),
  update_at date not null,
  join_at date not null,
  user_image varchar(100)
);

create table if not exists recipe (
  id serial not null,
  account_id int not null,
  recipe_name varchar (50) not null,
  description text,
  instruction text,
  rating float not null,
  follower int not null, --number of user bookmarked this recipe
  num_of_rating int not null,
  num_of_comments int not null,
  update_at date not null,
  create_at date not null,
  recipe_image varchar(100)
);

create table if not exists ingredient (
  id serial not null,
  ingredient_name varchar (50) not null,
  ingredient_image varchar(100)
);

create table if not exists recipe_ingredient (
  recipe_id int not null,
  ingredient_id int not null,
  amount varchar(20) not null,
  constraint pk_recipe_id_ingredient_id unique (recipe_id, ingredient_id)
);

create table if not exists recipe_account_save (
  recipe_id int not null,
  account_id int not null,
  constraint pk_recipe_id_account_id unique (recipe_id, account_id)
);

create table if not exists recipe_account_rating (
  recipe_id int not null,
  account_id int not null,
  rating int not null,
  constraint pk_recipe_id_account_id_rating unique (recipe_id, account_id)
);

create table if not exists subscription_account (
  account_id int not null,
  follower_account_id int not null,
  constraint pk_subscription_account_id unique (account_id, follower_account_id)
);


create table if not exists recipe_account_comment (
  id serial primary key,
  recipe_id int not null,
  account_id int not null,
  comment_content TEXT not null,
  update_at date not null,
  parent_comment_id int
);




