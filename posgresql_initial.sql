create table if not exists account (
  id serial primary key,
  user_name varchar (50) not null,
  user_email varchar (100) not null,
  user_password varchar (150) not null,
  description varchar (100),
  num_of_followers int not null, --number of user followed this user (need?)
  update_at TIMESTAMP not null,
  join_at TIMESTAMP not null,
  user_image varchar(100),
  constraint unique_account_email unique (user_email)
);

create table if not exists recipe (
  id serial primary key,
  account_id int not null,
  recipe_name varchar (50) not null,
  description text,
  instruction text,
  rating float not null,
  num_of_followers int not null, --number of user bookmarked this recipe (need?)
  num_of_rating int not null,
  num_of_comments int not null,
  update_at TIMESTAMP not null,
  create_at TIMESTAMP not null,
  recipe_image varchar(100),
  FOREIGN KEY (account_id) REFERENCES account(id)
);

create table if not exists register_account (
  user_name varchar (50) not null,
  user_email varchar (100) not null,
  user_password varchar (100) not null,
  constraint unique_user_name unique (user_name, user_email)
);

create table if not exists firebase_messaging_token (
  firebase_token text not null,
  account_id int not null,
  FOREIGN KEY (account_id) REFERENCES account(id),
  constraint pk_firebase_token_account_id unique (firebase_token, account_id)
);

create table if not exists account_login_status (
  user_email varchar (100) primary key,
  session_token varchar (500) not null,
  FOREIGN KEY (user_email) REFERENCES account(user_email),
  constraint unique_login unique (user_email, session_token)
);

create table if not exists ingredient (
  id serial primary key,
  ingredient_name varchar (50) not null,
  ingredient_image varchar(100)
);

create table if not exists recipe_ingredient (
  recipe_id int not null,
  ingredient_id int not null,
  quantity varchar(20),
  constraint pk_recipe_id_ingredient_id unique (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
);

create table if not exists recipe_account_save ( --user bookmark recipe table
  recipe_id int not null,
  account_id int not null,
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (account_id) REFERENCES account(id),
  constraint pk_recipe_id_account_id unique (recipe_id, account_id)
);

create table if not exists recipe_account_rating (
  recipe_id int not null,
  account_id int not null,
  rating NUMERIC(2, 1) not null,
  review varchar(300),
  review_recipe_image varchar(100),
  update_at TIMESTAMP not null,
  create_at TIMESTAMP not null,
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (account_id) REFERENCES account(id),
  constraint pk_recipe_id_account_id_rating unique (recipe_id, account_id)
);

create table if not exists subscription_account (
  account_id int not null,
  follower_account_id int not null,
  constraint pk_subscription_account_id unique (account_id, follower_account_id),
  FOREIGN KEY (account_id) REFERENCES account(id),
  FOREIGN KEY (follower_account_id) REFERENCES account(id)
);


create table if not exists recipe_account_comment (
  id serial primary key,
  recipe_id int not null,
  account_id int not null,
  comment_content TEXT not null,
  update_at TIMESTAMP not null,
  num_of_reply int not null,
  num_of_like int not null,
  parent_comment_id int,
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (account_id) REFERENCES account(id),
  FOREIGN KEY (parent_comment_id) REFERENCES recipe_account_comment(id)
);

create table if not exists notification (
  id serial primary key,
  title varchar(50) not null,
  notification_content varchar(100) not null,
  notification_image varchar(50),
  on_click_type notification_type not null, --type of noti
  relevant_data int not null, --*
  create_at TIMESTAMP not null,
  constraint pk_notification unique (title, notification_content)
);
-- người bạn theo dõi thêm recipe (relevant_data gửi id recipe),
-- bạn có người theo dõi mới (relevant_data gửi id user),
-- recipe bạn bookmark có đánh giá mới (relevant_data gửi id recipe),
-- recipe của bạn có đánh giá mới (relevant_data gửi id recipe)

create table if not exists notification_to_account (
  notification_id int not null,
  account_id int not null,
  is_seen int not null, --0 là chưa xem 1 là xem 
  constraint pk_notification_to_account unique (notification_id, account_id),
  FOREIGN KEY (notification_id) REFERENCES notification(id),
  FOREIGN KEY (account_id) REFERENCES account(id)
);

create type notification_type as enum (
  'user',
  'recipe'
);

CREATE INDEX idx_notification_id ON notification_to_account (notification_id);
CREATE INDEX idx_account_id ON notification_to_account (account_id);
 






