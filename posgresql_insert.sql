-- Insert data into the account table
INSERT INTO account (user_name, user_email, user_password, update_at, join_at) 
VALUES 
  ('JohnDoe', 'johndoe@example.com', 'password123', '2024-03-04', '2024-01-01'),
  ('JaneSmith', 'janesmith@example.com', 'password456', '2024-03-04', '2023-12-15'),
 ('QuocAnh', 'quocanh@example.com', 'password789', '2024-03-05', '2023-12-25'),
   ('Alice Smith', 'alice@example.com', 'password456', '2024-03-04', '2024-03-04'),
  ('Bob Johnson', 'bob@example.com', 'password789', '2024-03-04', '2024-03-04'),
  ('Emily Davis', 'emily@example.com', 'password321', '2024-03-04', '2024-03-04'),
  ('Michael Wilson', 'michael@example.com', 'password654', '2024-03-04', '2024-03-04');

-- Insert data into the recipe table
INSERT INTO recipe (account_id, recipe_name, description, rating, follower, num_of_rating, num_of_comments, update_at, create_at) 
VALUES 
  (1, 'Pancakes', 'Delicious pancakes recipe', 0, 0, 0, 0, '2024-03-04', '2024-01-01'),
  (1, 'Scrambled Eggs', 'Quick and easy scrambled eggs recipe', 0, 0, 0, 0, '2024-03-03', '2024-01-02'),
  (2, 'Chocolate Cake', 'Decadent chocolate cake recipe', 0, 0, 0, 0, '2024-03-04', '2024-01-02'),
   (1, 'Spaghetti Carbonara', 'Classic pasta dish with bacon and cheese', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (2, 'Chicken Curry', 'Spicy chicken curry with rice', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (3, 'Vanilla Cake', 'Yummy Vanilla cake recipe', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (4, 'Grilled Salmon', 'Healthy grilled salmon with vegetables', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (4, 'Caesar Salad', 'Classic Caesar salad with homemade dressing', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (5, 'Vegetable Stir-Fry', 'Quick and easy vegetable stir-fry', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (5, 'Margarita Pizza', 'Classic margarita pizza with fresh basil', 0, 0, 0, 0,'2024-03-04', '2024-03-04');
 
 
 
 -- Insert data into the recipe_account_rating table
INSERT INTO recipe_account_rating (recipe_id, account_id, rating) 
VALUES 
  (1, 1, 4),
  (1, 2, 5),
  (1, 3, 4),
  (2, 1, 3),
  (2, 2, 4),
  (3, 1, 5),
  (3, 2, 5);

-- Insert data into the ingredient table
INSERT INTO ingredient (ingredient_name)
VALUES 
  ('Flour'),
  ('Eggs'),
  ('Chocolate'),
  ('Pasta'),
  ('Bacon'),
  ('Chicken'),
  ('Rice'),
  ('Salmon'),
  ('Vegetables'),
  ('Lettuce'),
  ('Tomatoes'),
  ('Basil'),
  ('Olive Oil'),
  ('Cheese'),
  ('Milk');

-- Sample data for recipe_ingredient can be generated randomly based on existing recipes and ingredients.
-- For example:
INSERT INTO recipe_ingredient (recipe_id, ingredient_id, amount)
SELECT 
  recipe.id AS recipe_id,
  ingredient.id AS ingredient_id,
  CONCAT(FLOOR(RANDOM() * 10 + 1), ' cups') AS amount
FROM recipe, ingredient
ORDER BY RANDOM()
LIMIT 35;

-- Sample data for recipe_account_save can be generated randomly based on existing recipes and accounts.
-- For example:
INSERT INTO recipe_account_save (recipe_id, account_id)
SELECT 
  recipe.id AS recipe_id,
  account.id AS account_id
FROM recipe, account
ORDER BY RANDOM()
LIMIT 25;

-- Sample data for recipe_account_rating can be generated randomly based on existing recipes and accounts.
INSERT INTO recipe_account_rating (recipe_id, account_id, rating)
SELECT 
  recipe.id AS recipe_id,
  account.id AS account_id,
  FLOOR(RANDOM() * 5 + 1) AS rating
FROM recipe, account
ORDER BY RANDOM()
LIMIT 15;

-- Inserting 17 rows
INSERT INTO subscription_account (account_id, follower_account_id)
values (1,2),(1,4),(1,5),(2,7),(2,3),(2,5),(2,6),(3,5),(4,6),(5,3),(5,1),(5,2),(5,4),(6,2),(6,5),(6,7),(7,6);

-- Inserting 40 rows
INSERT INTO recipe_account_comment (recipe_id, account_id, comment_content, update_at, parent_comment_id)
VALUES 
  (1, 1, 'This pancake recipe is amazing!', '2024-03-01', 1),
  (1, 2, 'I love pancakes!', '2024-03-02', NULL),
  (1, 3, 'Great recipe, thank you!', '2024-03-03', 1),
  (1, 4, 'I tried this recipe and it turned out great!', '2024-03-04', NULL),
  (1, 5, 'Best pancakes ever!', '2024-03-05', NULL),
  (2, 1, 'I enjoy scrambled eggs for breakfast.', '2024-03-06', NULL),
  (2, 2, 'Quick and delicious breakfast option.', '2024-03-07', 9),
  (2, 3, 'Scrambled eggs are my favorite!', '2024-03-08', NULL),
  (2, 4, 'Simple and tasty recipe!', '2024-03-09', NULL),
  (2, 5, 'I make scrambled eggs every weekend.', '2024-03-10', NULL),
  (3, 1, 'Chocolate cake is the best!', '2024-03-11', 11),
  (3, 2, 'Decadent and rich chocolate cake recipe.', '2024-03-12', 11),
  (3, 3, 'My family loved this cake!', '2024-03-13', NULL),
  (3, 4, 'Delicious chocolate cake!', '2024-03-14', 11),
  (3, 5, 'Chocolate cake is always a hit!', '2024-03-15', NULL),
  (4, 1, 'I love spaghetti carbonara!', '2024-03-16', 19),
  (4, 2, 'Classic pasta dish with amazing flavors.', '2024-03-17', NULL),
  (4, 3, 'One of my favorite pasta recipes.', '2024-03-18', NULL),
  (4, 4, 'Delicious and comforting.', '2024-03-19', NULL),
  (4, 5, 'Simple yet delicious recipe!', '2024-03-20', 19),
  (5, 1, 'Chicken curry is a staple in my household.', '2024-03-21', NULL),
  (5, 2, 'Spicy and flavorful chicken curry.', '2024-03-22', NULL),
  (5, 3, 'This curry recipe is fantastic!', '2024-03-23', NULL),
  (5, 4, 'Authentic and delicious.', '2024-03-24', 21),
  (5, 5, 'Perfect for dinner!', '2024-03-25', NULL),
  (6, 1, 'Vanilla cake is a classic dessert.', '2024-03-26', 27),
  (6, 2, 'Simple and delicious vanilla cake recipe.', '2024-03-27', 27),
  (6, 3, 'This cake recipe is a winner!', '2024-03-28', NULL),
  (6, 4, 'Vanilla cake is always a hit at parties.', '2024-03-29', 27),
  (6, 5, 'Yummy vanilla cake!', '2024-03-30', NULL),
  (7, 1, 'Grilled salmon is healthy and delicious.', '2024-03-31', NULL),
  (7, 2, 'This salmon recipe is perfect for summer.', '2024-04-01', NULL),
  (7, 3, 'Grilled salmon with veggies is my favorite!', '2024-04-02', NULL),
  (7, 4, 'Healthy and flavorful grilled salmon.', '2024-04-03', NULL),
  (7, 5, 'Great recipe for a healthy dinner!', '2024-04-04', 33),
  (8, 1, 'Caesar salad is a classic side dish.', '2024-04-05', NULL),
  (8, 2, 'Homemade Caesar salad dressing is the best.', '2024-04-06', NULL),
  (8, 3, 'Love this Caesar salad recipe!', '2024-04-07', 39),
  (8, 4, 'Perfect salad for any occasion.', '2024-04-08', 39),
  (8, 5, 'Delicious and refreshing Caesar salad!', '2024-04-09', NULL);









