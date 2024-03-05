

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


 
--get ingredients detail of 'Pancakes'
SELECT ingredient_id, ingredient_name, ingredient_image, amount, recipe_name, recipe.id
FROM recipe 
JOIN recipe_ingredient ON recipe.id = recipe_ingredient.recipe_id 
JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id
where recipe_name = 'Pancakes';

--

select * from recipe where recipe_name = 'Pancakes';


          select child_comment.id as child_id, parent_comment.id as parent_id
          from recipe_account_comment as parent_comment 
          join recipe_account_comment as child_comment on child_comment.parent_comment_id = parent_comment.id 
          where parent_comment.recipe_id != child_comment.recipe_id;
          
         