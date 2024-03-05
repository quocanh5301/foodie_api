

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


 
--get ingredients detail of "id" 'Pancakes'
SELECT ingredient_id, ingredient_name, ingredient_image, amount
FROM recipe 
JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id 
JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id
where recipe.id  = 2;

--
SELECT ingredient_id, ingredient_name, ingredient_image, amount FROM recipe JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id where recipe.id = 2;


select * from recipe where recipe_name = 'Pancakes';



          
         