

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


 
--get ingredients detail of "id" 'Pancakes'
SELECT ingredient_id, ingredient_name, ingredient_image, amount
FROM recipe 
JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id 
JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id
where recipe.id  = 2;

--
SELECT ingredient_id, ingredient_name, ingredient_image, amount FROM recipe JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id where recipe.id = 2 ORDER BY ingredient_id ASC;

--get bookmark recipe of user with id 5
select * from recipe where id in (select recipe_id from recipe_account_save where account_id = 5) limit 2 offset 2;
select * from recipe where recipe_name = 'Pancakes';

select recipe_id from recipe_account_save where account_id = 5;

update account set user_image = 'test/409109404_957680309062858_6882892167285190303_n.jpg', user_name = 'hehe' where user_name = 'JaneSmith';

update recipe set recipe_image = '424992880_435046962204108_5280980655528045169_n.jpg' where id = 1;
update firebase_messaging_token set firebase_token = 'eStAFn1oQumhFbq5jKq2b4:APA91bEA_DMzlTVL6QBMtufI8LT6J_0Deftxzy-7uezp1L20zQ_zLwBgz7SywbpJq-rmMNJwi3Po3jExyaYSaYIFC7RuSbFQsFhdMUklC29I4t2-A8ZwyIeKpd9jMnKyjRFF2Bf8yYaL' where account_id = 10;

select * from (select * from recipe order by id desc) as sort_recipe ORDER BY ABS(EXTRACT(EPOCH FROM create_at - CURRENT_TIMESTAMP)) DESC limit 3 offset 0;


select * from recipe where num_of_rating >= 4 and rating >= 3 order by (num_of_rating*rating) desc limit 45 offset 0;

select firebase_token from firebase_messaging_token join subscription_account on firebase_messaging_token.account_id = subscription_account.follower_account_id where subscription_account.account_id = 8;


delete from recipe where recipe_name = 'some kind of food';


select recipe_id from recipe_account_save where account_id = 3;

select * from recipe where account_id in (5,10);
SELECT id FROM subscription_account join account on subscription_account.account_id = account.id WHERE follower_account_id = 1;
select * from recipe where id in (select recipe_id from recipe_account_save where account_id = 3) limit 5 offset 0;

select firebase_token from firebase_messaging_token join recipe on firebase_messaging_token.account_id = recipe.account_id  where recipe.id = 20;
 
SELECT ingredient_id, ingredient_name, ingredient_image, amount FROM recipe JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id where recipe.id = 2 ORDER BY ingredient_id asc;

insert into recipe_ingredient (recipe_id, ingredient_id, amount) values ();