

select * from account;
select * from firebase_messaging_token;
select * from ingredient;
select * from recipe;
select * from recipe_account_comment;
select * from recipe_account_rating;
select * from recipe_account_save;
select * from recipe_ingredient;
select * from register_account;
select * from subscription_account;
select * from account_login_status;
select * from notification;
select * from notification_to_account;


 
--get ingredients detail of "id" 'Pancakes'
SELECT ingredient_id, ingredient_name, ingredient_image, amount
FROM recipe 
JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id 
JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id
where recipe.id  = 2;

INSERT INTO recipe (account_id, recipe_name, description, instruction, rating, num_of_followers, num_of_rating, num_of_comments, update_at, create_at, recipe_image)
VALUES 
 (10, 'Ratatouille', 'Classic French vegetable stew', 'Sauté onions, garlic, and bell peppers. Add tomatoes, zucchini, eggplant, and herbs. Simmer until vegetables are tender. Serve hot or cold.', 0, 0, 0, 0, '2024-03-04', '2024-03-04', ''),
(10, 'Butter Chicken', 'Delicious Indian butter chicken curry', 'Marinate chicken in yogurt and spices. Cook in a rich tomato and butter sauce. Serve with rice or naan bread.', 0, 0, 0, 0, '2024-03-04', '2024-03-04', ''),
(9, 'Beef Stroganoff', 'Rich and creamy beef stroganoff', 'Sauté beef strips with mushrooms and onions. Add sour cream and beef broth. Simmer until sauce thickens. Serve over cooked noodles.', 0, 0, 0, 0, '2024-03-04', '2024-03-04', ''),
 (9, 'Shrimp Scampi', 'Classic shrimp scampi with garlic and lemon', 'Sauté shrimp in butter, garlic, and lemon juice. Serve over cooked pasta or with crusty bread.', 0, 0, 0, 0, '2024-03-04', '2024-03-04', ''),
(9, 'Beef Stir-Fry', 'Flavorful beef stir-fry with broccoli and bell peppers', 'Marinate beef strips with soy sauce and garlic. Stir-fry with broccoli and bell peppers until tender. Serve over rice.', 0, 0, 0, 0,'2024-03-04', '2024-03-04', ''),
(9, 'Vegetarian Chili', 'Hearty vegetarian chili packed with beans and vegetables', 'Simmer beans, tomatoes, and vegetables with chili spices until flavors meld. Serve hot with toppings like cheese and sour cream.', 0, 0, 0, 0, '2024-03-04', '2024-03-04', '');

--
SELECT ingredient_id, ingredient_name, ingredient_image, amount FROM recipe JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id where recipe.id = 2 ORDER BY ingredient_id ASC;

--get bookmark recipe of user with id 5
select * from recipe where id in (select recipe_id from recipe_account_save where account_id = 5) limit 2 offset 2;
insert into account (user_image) values (hehe) where id = 1;
insert into subscription_account (account_id, follower_account_id) values (11, 10);

update account set user_image = 'af8b0721-d35d-4265-968f-8447ae3atiqa.jpeg' where id = 11;

update account set user_name  = 'golden boy' where id = 6; 

select recipe_id from recipe_account_save where account_id = 5;

update account set user_image = 'test/409109404_957680309062858_6882892167285190303_n.jpg', user_name = 'hehe' where user_name = 'JaneSmith';

update recipe set recipe_image = null where id = 39;
update firebase_messaging_token set firebase_token = 'eStAFn1oQumhFbq5jKq2b4:APA91bEA_DMzlTVL6QBMtufI8LT6J_0Deftxzy-7uezp1L20zQ_zLwBgz7SywbpJq-rmMNJwi3Po3jExyaYSaYIFC7RuSbFQsFhdMUklC29I4t2-A8ZwyIeKpd9jMnKyjRFF2Bf8yYaL' where account_id = 10;

select * from (select * from recipe order by id desc) as sort_recipe ORDER BY ABS(EXTRACT(EPOCH FROM create_at - CURRENT_TIMESTAMP)) DESC limit 3 offset 0;

delete from account  where id = 8;


select * from recipe where num_of_rating >= 4 and rating >= 3 order by (num_of_rating*rating) desc limit 45 offset 0;

select firebase_token from firebase_messaging_token join subscription_account on firebase_messaging_token.account_id = subscription_account.follower_account_id where subscription_account.account_id = 8;


delete from recipe where recipe_name = 'some kind of food';


select recipe_id from recipe_account_save where account_id = 3;

select id, account_id, recipe_name, recipe_image, create_at, update_at, num_of_comments, num_of_rating, num_of_followers, rating from (select * from recipe order by id desc) as sort_recipe where id in (select recipe_id from recipe_account_save where account_id = 2) ;
SELECT id FROM subscription_account join account on subscription_account.account_id = account.id WHERE follower_account_id = 1;
select * from recipe where id in (select recipe_id from recipe_account_save where account_id = 3) limit 5 offset 0;

select firebase_token from firebase_messaging_token join recipe on firebase_messaging_token.account_id = recipe.account_id  where recipe.id = 20;
 
SELECT ingredient_id, ingredient_name, ingredient_image, amount FROM recipe JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id where recipe.id = 2 ORDER BY ingredient_id asc;

insert into recipe_ingredient (recipe_id, ingredient_id, amount) values ();

select id, account_id, recipe_name, recipe_image, create_at, update_at, num_of_comments, num_of_rating, num_of_followers, rating from recipe where num_of_rating >= 0 and rating >= 0 order by (num_of_rating*rating) desc, id desc limit 5 offset 5;

create table if not exists recipe_account_rating (
  recipe_id int not null,
  account_id int not null,
  rating int not null,
  review varchar(300),
  constraint pk_recipe_id_account_id_rating unique (recipe_id, account_id)
);

select *  from recipe_account_comment where account_id = 4 group by id ;
select id from recipe where account_id = 4;

select * from recipe_account_rating where recipe_id  in (select id from recipe where account_id = 9) order by create_at, update_at desc limit 20 offset 0;

select recipe_name from recipe where account_id = 10;

select * from recipe_account_rating where recipe_id = 19 order by create_at, update_at desc limit 20 offset 0;

select id, title, notification_content, notification_image, on_click_type, relevant_data, create_at from notification join notification_to_account on notification.id = notification_to_account.notification_id where notification_to_account.account_id = 7;


