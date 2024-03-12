-- Insert data into the account table
INSERT INTO account (user_name, user_email, user_password, num_of_followers, update_at, join_at) 
VALUES 
  ('JohnDoe', 'johndoe@example.com', 'password123', 0, '2024-03-04', '2024-01-01'),
  ('JaneSmith', 'janesmith@example.com', 'password456', 0,'2024-03-04', '2023-12-15'),
 ('QuocAnh', 'quocanh@example.com', 'password789',0, '2024-03-05', '2023-12-25'),
   ('Alice Smith', 'alice@example.com', 'password456',0, '2024-03-04', '2024-03-04'),
  ('Bob Johnson', 'bob@example.com', 'password789',0, '2024-03-04', '2024-03-04'),
  ('Emily Davis', 'emily@example.com', 'password321',0, '2024-03-04', '2024-03-04'),
  ('Michael Wilson', 'michael@example.com', 'password654',0, '2024-03-04', '2024-03-04');

-- Insert data into the recipe table
INSERT INTO recipe (account_id, recipe_name, description, instruction, rating, num_of_followers, num_of_rating, num_of_comments, update_at, create_at) 
VALUES 
  (1, 'Pancakes', 'Delicious pancakes recipe', 'Add flour, milk, eggs, and sugar. Mix well and cook on a hot griddle until golden brown on both sides.', 0, 0, 0, 0, '2024-03-04', '2024-01-01'),
  (1, 'Scrambled Eggs', 'Quick and easy scrambled eggs recipe', 'Crack eggs into a bowl, whisk, and cook in a pan with butter until fluffy.', 0, 0, 0, 0, '2024-03-03', '2024-01-02'),
  (2, 'Chocolate Cake', 'Decadent chocolate cake recipe', 'Mix flour, cocoa powder, sugar, and eggs. Bake in the oven until cooked through.', 0, 0, 0, 0, '2024-03-04', '2024-01-02'),
  (1, 'Spaghetti Carbonara', 'Classic pasta dish with bacon and cheese', 'Cook spaghetti according to package instructions. In a separate pan, fry bacon until crispy. Mix cooked spaghetti with beaten eggs, grated cheese, and bacon. Serve hot.', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (2, 'Chicken Curry', 'Spicy chicken curry with rice', 'Marinate chicken with spices and yogurt. Cook in a pan with onions, tomatoes, and curry paste. Serve with rice.', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (3, 'Vanilla Cake', 'Yummy Vanilla cake recipe', 'Cream butter and sugar. Add eggs and vanilla extract. Fold in flour and bake in a preheated oven.', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (4, 'Grilled Salmon', 'Healthy grilled salmon with vegetables', 'Season salmon fillets with salt and pepper. Grill until cooked through. Serve with roasted vegetables.', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (4, 'Caesar Salad', 'Classic Caesar salad with homemade dressing', 'Toss chopped lettuce with Caesar dressing, croutons, and grated Parmesan cheese.', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (5, 'Vegetable Stir-Fry', 'Quick and easy vegetable stir-fry', 'Stir-fry mixed vegetables in a hot pan with garlic, ginger, and soy sauce. Serve over rice.', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (5, 'Margarita Pizza', 'Classic margarita pizza with fresh basil', 'Spread tomato sauce on pizza dough, add sliced mozzarella and fresh basil leaves. Bake in a hot oven until crust is crispy.', 0, 0, 0, 0,'2024-03-04', '2024-03-04'),
    (6, 'French Toast', 'Classic French toast recipe', 'Soak bread slices in beaten egg mixture and cook in a buttered skillet until golden brown on both sides. Serve with maple syrup.', 0, 0, 0, 0, '2024-03-04', '2024-01-01'),
  (7, 'Omelette', 'Simple omelette recipe', 'Beat eggs with salt and pepper. Pour into a hot, greased pan and cook until set. Fold in fillings like cheese, vegetables, or ham.', 0, 0, 0, 0, '2024-03-03', '2024-01-02'),
  (8, 'Tiramisu', 'Classic Italian dessert recipe', 'Layer ladyfingers soaked in coffee with a mascarpone cheese mixture. Dust with cocoa powder and chill before serving.', 0, 0, 0, 0, '2024-03-04', '2024-01-02'),
  (9, 'Baked Ziti', 'Hearty baked pasta dish', 'Cook ziti pasta until al dente. Mix with marinara sauce, ricotta cheese, and mozzarella. Bake until bubbly and golden.', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (10, 'Tacos', 'Easy taco recipe', 'Season ground beef with taco seasoning and cook until browned. Serve in taco shells with lettuce, cheese, salsa, and sour cream.', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (6, 'Blueberry Muffins', 'Homemade blueberry muffins', 'Mix flour, sugar, and baking powder. Fold in blueberries and bake until golden brown. Enjoy warm with butter.', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (7, 'Pasta Primavera', 'Vegetarian pasta dish', 'Cook pasta and toss with sautéed vegetables, olive oil, and Parmesan cheese. Season with salt and pepper to taste.', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (8, 'Chicken Alfredo', 'Creamy chicken pasta recipe', 'Cook chicken until browned and cooked through. Stir in Alfredo sauce and cooked pasta. Simmer until heated through. Serve hot.', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (9, 'Chocolate Chip Cookies', 'Classic cookie recipe', 'Cream butter and sugars. Add eggs and vanilla, then mix in flour and chocolate chips. Drop spoonfuls onto a baking sheet and bake until golden.', 0, 0, 0, 0, '2024-03-04', '2024-03-04'),
  (10, 'Guacamole', 'Fresh avocado dip', 'Mash ripe avocados with lime juice, salt, and minced garlic. Stir in diced tomatoes, onions, and cilantro. Serve with tortilla chips.', 0, 0, 0, 0,'2024-03-04', '2024-03-04');

 
 
 
 -- Insert data into the recipe_account_rating table 7 recipe_id and 10 account_id
INSERT INTO recipe_account_rating (recipe_id, account_id, rating) 
VALUES 
(1, 1, 5), (1, 2, 4), (1, 3, 3), (1, 4, 2), (1, 5, 1),
(2, 1, 4), (2, 2, 3), (2, 3, 2), (2, 4, 1), (2, 5, 5),
(3, 1, 3), (3, 2, 2), (3, 3, 1), (3, 4, 5), (3, 5, 4),
(4, 1, 2), (4, 2, 1), (4, 3, 5), (4, 4, 4), (4, 5, 3),
(5, 1, 1), (5, 2, 5), (5, 3, 4), (5, 4, 3), (5, 5, 2),
(6, 2, 4), (6, 3, 3), (6, 4, 2), (6, 5, 1), (6, 6, 5),
(7, 3, 5), (7, 4, 4), (7, 5, 3), (7, 6, 2), (7, 7, 1),
(8, 4, 3), (8, 5, 2), (8, 6, 1), (8, 7, 5), (9, 5, 1),
(9, 6, 5), (9, 7, 4), (10, 6, 4), (10, 7, 3), (5, 6, 5), (5, 7, 5), (6, 1, 4), (6, 7, 5), (4, 6, 4), (4, 7, 4);


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
 
 
INSERT INTO firebase_messaging_token  (firebase_token, account_id) 
VALUES 
('fTshpZX1TRO2W49voXRH7V:APA91bEm4xxlRoU5VhUgw6I87xOo6E0Wga-Sn94OrmnUGA4ARkr_H5iYXphk0bfy0VpQV6ic89XwS3NBki9purV4DieEznaKTghU_FcM3lhdERtk8eR9MyUE-Pud4BOit-vCnrzdPN1f', 8), -- pixel 5
('c9so6X7YSPKoPeWShDraJA:APA91bHtX91W2avS0J5Jr0rNCd0tslvGTOaZDUjjDcT4PQzCAhohEVjrTmqGaTu8qdp5btaozMOf3mT1WemxX9EH9nVqfsXSn9xfANztpE_gUc5Pz7Yntn5YFzn7NdUpB8u_4-Ml0Inx', 9), -- pixel 3
('eStAFn1oQumhFbq5jKq2b4:APA91bEA_DMzlTVL6QBMtufI8LT6J_0Deftxzy-7uezp1L20zQ_zLwBgz7SywbpJq-rmMNJwi3Po3jExyaYSaYIFC7RuSbFQsFhdMUklC29I4t2-A8ZwyIeKpd9jMnKyjRFF2Bf8yYaL', 10); -- poco


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
values (1,2),(1,4),(1,5),(2,7),(2,3),(2,5),(2,6),(3,5),(4,6),(5,3),(5,1),(5,2),(5,4),(6,2),(6,5),(6,7),(7,6);


-- Inserting 17 rows
INSERT INTO subscription_account (account_id, follower_account_id)
values (1,2),(1,4),(1,5),(2,7),(2,3),(2,5),(2,6),(3,5),(4,6),(5,3),(5,1),(5,2),(5,4),(6,2),(6,5),(6,7),(7,6),
(8,9),(8,10),(10,8),(10,9),(10,1);

-- Inserting 40 rows
INSERT INTO recipe_account_comment (recipe_id, account_id, comment_content, update_at, parent_comment_id,num_of_reply)
VALUES 
  (1, 1, 'This pancake recipe is amazing!', '2024-03-01', 1,0),
  (1, 2, 'I love pancakes!', '2024-03-02', NULL,0),
  (1, 3, 'Great recipe, thank you!', '2024-03-03', 1,0),
  (1, 4, 'I tried this recipe and it turned out great!', '2024-03-04', NULL,0),
  (1, 5, 'Best pancakes ever!', '2024-03-05', NULL,0),
  (2, 1, 'I enjoy scrambled eggs for breakfast.', '2024-03-06', NULL,0),
  (2, 2, 'Quick and delicious breakfast option.', '2024-03-07', 9,0),
  (2, 3, 'Scrambled eggs are my favorite!', '2024-03-08', NULL,0),
  (2, 4, 'Simple and tasty recipe!', '2024-03-09', NULL,0),
  (2, 5, 'I make scrambled eggs every weekend.', '2024-03-10', NULL,0),
  (3, 1, 'Chocolate cake is the best!', '2024-03-11', 11,0),
  (3, 2, 'Decadent and rich chocolate cake recipe.', '2024-03-12', 11,0),
  (3, 3, 'My family loved this cake!', '2024-03-13', NULL,0),
  (3, 4, 'Delicious chocolate cake!', '2024-03-14', 11,0),
  (3, 5, 'Chocolate cake is always a hit!', '2024-03-15', NULL,0),
  (4, 1, 'I love spaghetti carbonara!', '2024-03-16', 19,0),
  (4, 2, 'Classic pasta dish with amazing flavors.', '2024-03-17', NULL,0),
  (4, 3, 'One of my favorite pasta recipes.', '2024-03-18', NULL,0),
  (4, 4, 'Delicious and comforting.', '2024-03-19', NULL,0),
  (4, 5, 'Simple yet delicious recipe!', '2024-03-20', 19,0),
  (5, 1, 'Chicken curry is a staple in my household.', '2024-03-21', NULL,0),
  (5, 2, 'Spicy and flavorful chicken curry.', '2024-03-22', NULL,0),
  (5, 3, 'This curry recipe is fantastic!', '2024-03-23', NULL,0),
  (5, 4, 'Authentic and delicious.', '2024-03-24', 21,0),
  (5, 5, 'Perfect for dinner!', '2024-03-25', NULL,0),
  (6, 1, 'Vanilla cake is a classic dessert.', '2024-03-26', 27,0),
  (6, 2, 'Simple and delicious vanilla cake recipe.', '2024-03-27', 27,0),
  (6, 3, 'This cake recipe is a winner!', '2024-03-28', NULL,0),
  (6, 4, 'Vanilla cake is always a hit at parties.', '2024-03-29', 27,0),
  (6, 5, 'Yummy vanilla cake!', '2024-03-30', NULL,0),
  (7, 1, 'Grilled salmon is healthy and delicious.', '2024-03-31', NULL,0),
  (7, 2, 'This salmon recipe is perfect for summer.', '2024-04-01', NULL,0),
  (7, 3, 'Grilled salmon with veggies is my favorite!', '2024-04-02', NULL,0),
  (7, 4, 'Healthy and flavorful grilled salmon.', '2024-04-03', NULL,0),
  (7, 5, 'Great recipe for a healthy dinner!', '2024-04-04', 33,0),
  (8, 1, 'Caesar salad is a classic side dish.', '2024-04-05', NULL,0),
  (8, 2, 'Homemade Caesar salad dressing is the best.', '2024-04-06', NULL,0),
  (8, 3, 'Love this Caesar salad recipe!', '2024-04-07', 39,0),
  (8, 4, 'Perfect salad for any occasion.', '2024-04-08', 39,0),
  (8, 5, 'Delicious and refreshing Caesar salad!', '2024-04-09', NULL,0);









