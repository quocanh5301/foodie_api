------- Create a trigger function to update recipe.num_of_rating and recipe.rating
CREATE OR REPLACE FUNCTION update_recipe_ratings()
RETURNS TRIGGER AS $$
declare new_num_of_rating int; new_rating float;
BEGIN
    -- Calculate the total number of ratings for the recipe
    SELECT COUNT(*) INTO new_num_of_rating
    FROM recipe_account_rating
    WHERE recipe_id = NEW.recipe_id;

    -- Calculate the total rating for the recipe
    SELECT SUM(rating)::float / NULLIF(new_num_of_rating, 0) INTO new_rating
    FROM recipe_account_rating
    WHERE recipe_id = NEW.recipe_id;

    -- Update the recipe table with the new values
    UPDATE recipe
    SET num_of_rating = new_num_of_rating,
        rating = new_rating
    WHERE id = NEW.recipe_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

drop trigger if exists update_rating on recipe_account_rating;

create trigger update_rating
after insert or update 
on recipe_account_rating
for each row
execute procedure update_recipe_ratings();

--create trigger to update recipe.num_of_rating when new row add to recipe_account_comment
CREATE OR REPLACE FUNCTION update_recipe_comments()
RETURNS TRIGGER AS $$
declare new_num_of_comments int;
BEGIN
    -- Calculate the total number of comments of the recipe
    SELECT COUNT(*) INTO new_num_of_comments
    FROM recipe_account_comment
    WHERE recipe_id = NEW.recipe_id;

    -- Update the recipe table with the new values
    UPDATE recipe
    SET num_of_comments  = new_num_of_comments
    WHERE id = NEW.recipe_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

drop trigger if exists update_comments on recipe_account_comment;

create trigger update_comments
after insert or delete  
on recipe_account_comment
for each row
execute procedure update_recipe_comments();

--catch error insert row with same account_id = follower_account_id in subscription_account table
CREATE OR REPLACE FUNCTION check_unique_account_id()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT *
        FROM subscription_account
        WHERE NEW.account_id = new.follower_account_id
    ) then
        DELETE FROM subscription_account
        WHERE NEW.account_id = new.follower_account_id;
        RAISE EXCEPTION 'The account_id % is the same as follower_account_id.', NEW.account_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

drop trigger if exists check_account_id on subscription_account;

create trigger check_account_id
after insert 
on subscription_account
for each row
execute procedure check_unique_account_id();

--remove comment where parent comment is comment in other recipe id (doesn't make sense)
CREATE OR REPLACE FUNCTION check_comment_validation()
RETURNS TRIGGER AS $$
begin
	if exists (select child_comment.id as child_id
          from recipe_account_comment as parent_comment 
          join recipe_account_comment as child_comment on child_comment.parent_comment_id = parent_comment.id 
          where parent_comment.recipe_id != child_comment.recipe_id)
    then      
	delete from recipe_account_comment 
	where id in (select child_comment.id as child_id
          from recipe_account_comment as parent_comment 
          join recipe_account_comment as child_comment on child_comment.parent_comment_id = parent_comment.id 
          where parent_comment.recipe_id != child_comment.recipe_id); 
    RAISE EXCEPTION 'Invalid parent comment of comment with id %', NEW.id;     
         
    end if;     
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

drop trigger if exists check_comment on recipe_account_comment;

create trigger check_comment
after insert or update  
on recipe_account_comment
for each row
execute procedure check_comment_validation();

--increase recipe "follower" when a user save that recipe to their bookmark list

CREATE OR REPLACE FUNCTION update_recipe_follower()
RETURNS TRIGGER AS $$
declare new_num_of_followers int;
BEGIN
    -- Calculate the total number of comments of the recipe
    SELECT COUNT(*) INTO new_num_of_followers
    FROM recipe_account_save
    WHERE recipe_id = NEW.recipe_id;

    -- Update the recipe table with the new values
    UPDATE recipe
    SET num_of_followers  = new_num_of_followers
    WHERE id = NEW.recipe_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

drop trigger if exists update_follower on recipe_account_save;

create trigger update_follower
after insert or delete  
on recipe_account_save
for each row
execute procedure update_recipe_follower();



--update user follower number when new row add to subscription table
CREATE OR REPLACE FUNCTION update_user_follower()
RETURNS TRIGGER AS $$
declare new_num_of_followers int;
BEGIN
    -- Calculate the total number of follower of user
    SELECT COUNT(*) into new_num_of_followers
    FROM subscription_account
    WHERE account_id = NEW.account_id;


    -- Update the recipe table with the new values
    UPDATE account
    SET num_of_followers = new_num_of_followers
    WHERE id = NEW.account_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

drop trigger if exists update_user_follower on subscription_account;

create trigger update_user_follower
after insert or delete
on subscription_account
for each row
execute procedure update_user_follower();

--update number of comment's REPLY when new comment add to recipe_account_comment 
CREATE OR REPLACE FUNCTION update_comment_reply_num()
RETURNS TRIGGER AS $$
declare new_num_of_reply int;
BEGIN
    -- Calculate the total number of follower of user
    SELECT COUNT(*) into new_num_of_reply
    FROM recipe_account_comment
    WHERE parent_comment_id = NEW.parent_comment_id;


    -- Update the recipe table with the new values
    UPDATE recipe_account_comment
    SET num_of_reply = new_num_of_reply
    WHERE id = NEW.parent_comment_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

drop trigger if exists update_comment_reply on recipe_account_comment;

create trigger update_comment_reply
after insert or delete  
on recipe_account_comment
for each row
execute procedure update_comment_reply_num();


