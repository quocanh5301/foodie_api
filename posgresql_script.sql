create table if not exists manganime (
  id serial primary key,
  title varchar (100) not null,
  category text[] not null,
  description varchar (500) not null,
  release_year int not null,
  author varchar (50) not null,
  num_of_chap int not null,
  is_manga boolean not null,
  image varchar(1000) not null
);

create table if not exists account (
  id serial primary key,
  user_name varchar (50) not null,
  user_email varchar (100) not null,
  user_password varchar (150) not null,
  join_since date not null,
  image varchar(500)
);

create table if not exists register_account (
  user_name varchar (50) not null,
  user_email varchar (100) not null,
  user_password varchar (100) not null,
  join_since date not null,
  image varchar(1000),
  constraint unique_user_name unique (user_name)
);

create table if not exists manga_account (
  manga_id int not null,
  account_id int not null,
  chap_read int not null,
  favorite boolean not null,
  watched boolean not null,
  constraint pk_manga_id_account_id primary key (manga_id, account_id)
);

create table if not exists anime_account (
  anime_id int not null,
  account_id int not null,
  episode_watched int not null,
  favorite boolean not null,
  watched boolean not null,
  constraint pk_anime_id_account_id primary key (anime_id, account_id)
);

create table if not exists reviews_anime (
  anime_id int not null,
  reviewer_id int not null,
  review_content varchar(5000) not null,
  constraint anime_review_id primary key (anime_id, reviewer_id)
)


-- reaction_code 1: like, 2: haha, 3: sad, 4: angry, 5: dislike, 6: wow
create table if not exists reviews_anime_reaction(
  anime_review_id int not null,
  reaction_code int not null,
  user_id int not null
)

create table if not exists reviews_manga (
  manga_id int not null,
  reviewer_id int not null,
  review_content varchar(5000) not null,
  constraint manga_review_id primary key (manga_id, reviewer_id)
)


-- reaction_code 1: like, 2: haha, 3: sad, 4: angry, 5: dislike, 6: wow
create table if not exists reviews_manga_reaction(
  manga_review_id int not null,
  reaction_code int not null,
  user_id int not null
)

-- Insert data into manganime table
INSERT INTO manganime (id, title, category, description, is_manga, release_year, author, image)
VALUES
  (1, 'One Piece', ARRAY['Action', 'Adventure', 'Comedy', 'Fantasy'], 'Follows Monkey D. Luffy and his pirate crew in search of the One Piece treasure.', true, 1997, 'Eiichiro Oda', 'https://cdn.oneesports.gg/cdn-data/2023/06/Anime_OnePiece_Wallpaper_StrawHatPirates_Complete.jpg'),
  (2, 'Naruto', ARRAY['Action', 'Adventure', 'Fantasy'], 'Naruto Uzumaki"s journey to become the strongest ninja.', true, 2002, 'Masashi Kishimoto', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvnEvAVL9dMwSWs6qY2nlIgKRMoJS5hyDC8Q&usqp=CAU'),
  (3, 'Death Note', ARRAY['Mystery', 'Thriller', 'Supernatural'], 'A high school student discovers a mysterious notebook with deadly powers.', true, 2006, 'Tsugumi Ohba', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngOh0s-VxZ-0_de892JGjyODTfeXNjzK5SA&usqp=CAU'),
  (4, 'Attack on Titan', ARRAY['Action', 'Fantasy', 'Drama', 'Horror'], 'Humanity fights for survival against giant humanoid creatures known as Titans.', true, 2013, 'Hajime Isayama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf4Chle0OEE37KYdIkd23S60X_10ZS70xuDw&usqp=CAU'),
  (5, 'Dragon Ball Z', ARRAY['Action', 'Adventure', 'Fantasy', 'Science Fiction'], 'Goku and his friends defend Earth against powerful foes.', true, 1989, 'Akira Toriyama', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREANOxQkzae63mTyeccGR9xnr5v4tFvZ2rXg&usqp=CAU'),
  (6, 'My Hero Academia', ARRAY['Action', 'Adventure', 'Superhero'], 'Follows a boy born without superpowers in a world where they are common.', true, 2016, 'Kohei Horikoshi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStKhJobxis-Ou_Sg4ge_SZqE60nhEjr7_sLQ&usqp=CAU'),
  (7, 'Demon Slayer', ARRAY['Action', 'Adventure', 'Supernatural', 'Fantasy'], 'Tanjiro Kamado fights demons after his family is slaughtered, and his sister turned into a demon.', true, 2019, 'Koyoharu Gotouge', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCrVn2FIJtjNmlcb2_w8V881jDh2W5cGAyDw&usqp=CAU'),
  (8, 'Cowboy Bebop', ARRAY['Action', 'Adventure', 'Science Fiction', 'Noir'], 'Bounty hunters travel through space in pursuit of criminals.', true, 1998, 'Shinichirō Watanabe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (9, 'Spirited Away', ARRAY['Animation', 'Adventure', 'Family', 'Fantasy'], 'A young girl gets trapped in a mysterious and magical world.', false, 2001, 'Hayao Miyazaki', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (10, 'Neon Genesis Evangelion', ARRAY['Action', 'Mecha', 'Psychological', 'Science Fiction'], 'Teenagers pilot giant mechs to protect Earth from mysterious beings known as Angels.', true, 1995, 'Hideaki Anno', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (11, 'One Punch Man', ARRAY['Action', 'Comedy', 'Superhero'], 'Saitama, a hero who can defeat any opponent with a single punch, seeks a worthy challenge.', true, 2015, 'ONE', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (12, 'Hunter x Hunter', ARRAY['Action', 'Adventure', 'Fantasy'], 'Gon Freecss aspires to become a Hunter and find his missing father.', true, 1999, 'Yoshihiro Togashi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (13, 'Fullmetal Alchemist: Brotherhood', ARRAY['Action', 'Adventure', 'Fantasy'], 'Two brothers search for the Philosopher Stone to restore their bodies.', true, 2009, 'Hiromu Arakawa', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (14, 'JoJo Bizarre Adventure', ARRAY['Action', 'Adventure', 'Supernatural'], 'Follows the adventures of the Joestar family across generations.', true, 2012, 'Hirohiko Araki', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (15, 'Steins Gate', ARRAY['Science Fiction', 'Thriller', 'Time Travel'], 'A group of friends accidentally invent a device that can send messages to the past.', true, 2011, 'Chiyomaru Shikura', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (16, 'Your Lie in April', ARRAY['Drama', 'Music', 'Romance'], 'A pianist helps a violinist overcome her trauma and return to music.', true, 2014, 'Naoshi Arakawa', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (17, 'Gurren Lagann', ARRAY['Action', 'Adventure', 'Mecha', 'Science Fiction'], 'Simon and his friends pilot giant robots to fight against oppressive forces.', true, 2007, 'Hiroyuki Imaishi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (18, 'Code Geass: Lelouch of the Rebellion', ARRAY['Action', 'Mecha', 'Science Fiction', 'Thriller'], 'Lelouch vi Britannia leads a rebellion against a powerful empire.', true, 2006, 'Goro Taniguchi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (19, 'Bleach', ARRAY['Action', 'Adventure', 'Supernatural'], 'Ichigo Kurosaki becomes a Soul Reaper to protect the living and the dead.', true, 2004, 'Tite Kubo', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (20, 'Mob Psycho 100', ARRAY['Action', 'Comedy', 'Supernatural'], 'A powerful psychic tries to live a normal life and control his abilities.', true, 2016, 'ONE', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (21, 'Black Clover', ARRAY['Action', 'Adventure', 'Fantasy', 'Magic'], 'A young boy born without magic powers strives to become the Wizard King.', true, 2017, 'Yūki Tabata', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (22, 'Fairy Tail', ARRAY['Action', 'Adventure', 'Comedy', 'Fantasy'], 'Natsu Dragneel and his friends take on various magical missions.', true, 2009, 'Hiro Mashima', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (23, 'Re:Zero - Starting Life in Another World', ARRAY['Drama', 'Fantasy', 'Isekai', 'Thriller'], 'Subaru Natsuki discovers he has the ability to return from death in another world.', true, 2016, 'Tappei Nagatsuki', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (24, 'The Promised Neverland', ARRAY['Horror', 'Mystery', 'Psychological', 'Thriller'], 'Children discover the dark truth behind their idyllic orphanage.', true, 2019, 'Kaiu Shirai', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhie0Q6GC7X9Bo22m379xAE1PNYivjQTbAw&usqp=CAU'),
  (25, 'Haikyuu!!', ARRAY['Comedy', 'Sports'], 'A high school volleyball team works towards nationals.', true, 2014, 'Haruichi Furudate', 'haikyuu.jpg');
