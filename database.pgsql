DROP TABLE IF EXISTS appuser;
CREATE TABLE appuser (
  id serial NOT NULL
, email text NOT NULL
, password text NOT NULL
, username text NOT NULL
, firstname text NOT NULL
, lastname text NOT NULL
, CONSTRAINT user_pk PRIMARY KEY (id)
);

DROP TABLE IF EXISTS genre;
CREATE TABLE genre (
  id serial NOT NULL
, name text NOT NULL
, CONSTRAINT genre_pk PRIMARY KEY (id)
);

DROP TABLE IF EXISTS label;
CREATE TABLE label (
  id serial NOT NULL
, name text NOT NULL
, profile text
, url text
, CONSTRAINT label_pk PRIMARY KEY (id)
);

DROP TABLE IF EXISTS format;
CREATE TABLE format (
  id serial NOT NULL
, name text NOT NULL
, CONSTRAINT format_pk PRIMARY KEY (id)
);

DROP TABLE IF EXISTS artist;
CREATE TABLE artist (
  id serial NOT NULL
, name text NOT NULL
, profile text
, CONSTRAINT artist_pk PRIMARY KEY (id)
);

DROP TABLE IF EXISTS style;
CREATE TABLE style (
  id serial NOT NULL
, CONSTRAINT style_pk PRIMARY KEY (id)
, name text NOT NULL
, genre_id integer REFERENCES genre(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS release;
CREATE TABLE release (
  id serial NOT NULL
, title text NOT NULL
, format_details text NOT NULL
, country text NOT NULL
, catno text
, release_date date NOT NULL
, create_date date NOT NULL
, CONSTRAINT release_pk PRIMARY KEY (id)
, appuser_id integer not null references appuser(id)
, label_id integer not null references label(id)
, format_id integer not null references format(id)
);

DROP TABLE IF EXISTS song;
CREATE TABLE song (
  title text NOT NULL
, position integer NOT NULL
, length time NOT NULL
, release_id integer not null references release(id)
, artist_id integer not null references artist(id)
, CONSTRAINT song_pk PRIMARY KEY (position, release_id, artist_id)
);

DROP TABLE IF EXISTS release_artist;
CREATE TABLE release_artist (
  release_id integer REFERENCES release (id) ON UPDATE CASCADE ON DELETE CASCADE
, artist_id integer REFERENCES artist (id) ON UPDATE CASCADE
, CONSTRAINT release_fk FOREIGN KEY(release_id) REFERENCES release(id)
, CONSTRAINT artist_fk FOREIGN KEY(artist_id) REFERENCES artist(id)
, CONSTRAINT release_artist_pkey PRIMARY KEY (release_id, artist_id)
);

DROP TABLE IF EXISTS release_genre;
CREATE TABLE release_genre (
  release_id integer REFERENCES release (id) ON UPDATE CASCADE ON DELETE CASCADE
, genre_id integer REFERENCES genre (id) ON UPDATE CASCADE
, CONSTRAINT release_fk FOREIGN KEY(release_id) REFERENCES release(id)
, CONSTRAINT genre_fk FOREIGN KEY(genre_id) REFERENCES genre(id)
, CONSTRAINT release_genre_pkey PRIMARY KEY (release_id, genre_id)
);

-- INSERT DATA --
INSERT INTO appuser(id, email, password, username, firstname, lastname)
	VALUES (1, 'mail@mail.com', '123456', 'vboukonis', 'Vasilis', 'Boukonis');

INSERT INTO label(id, name, profile, url)
	VALUES (1, 'Virgin EMI Records', 'virgin profile', 'https://url.com')
  , (2, 'Parlophone', 'Parlophone profile', 'https://url.com');

INSERT INTO format(id, name)
	VALUES (1, 'Vinyl')
  , (2, 'CD')
  , (3, 'mp3');

INSERT INTO artist(id, name, profile)
	VALUES (1, 'Brian Eno', 'Brian Eno is an electronic musician and producer. Also known for his multifaceted interests outside of music, especially technological. He was born 15 May 1948 in Woodbridge, Suffolk, UK. He attended Ipswich and Winchester Arts Schools where he studied with Tom Phillips, Roy Ascott, Christian Wolff, Anthony Benjamin, Noel Forster and George Brecht.')
  , (2, 'Gorillaz', 'Virtual band founded in 1998 by Damon Albarn from Blur, and comic-book artist Jamie Hewlett designing and drawing the band. It can be found in The Guiness Book of World Records under Most Successful Virtual Band. When the band were first created in 1998, the original concept was a group named ''Gorilla'', with a slightly different lineup.');

INSERT INTO genre(id, name)
	VALUES (1, 'Electronic')
  , (2, 'Classic')
  , (3, 'Rock');

INSERT INTO style(
	id, name, genre_id)
	VALUES (1, 'Experimental', 1)
  , (2, 'Ambient', 1)
  , (3, 'Alternative Rock', 3);

INSERT INTO release(id, title, format_details, country, catno, release_date, create_date, label_id, appuser_id, format_id)
	VALUES (1, 'Discreet Music', 'Clear Vinyl', 'Europe', 'ENOLP5', '11-16-2018', '05-01-2020', 1, 1, 1)
  , (2, 'The Now Now', 'Red Vinyl Ltd Edition', 'Europe', '0190295643423', '07-29-2018', '05-01-2020', 2, 1, 1);

INSERT INTO release_genre(release_id, genre_id)
	VALUES (1, 1)
  , (1, 2)
  , (2, 3);

INSERT INTO release_artist(release_id, artist_id)
	VALUES (1, 1)
  , (2, 2);

INSERT INTO song(title, position, length, release_id, artist_id)
	VALUES ('Discreet Music', 1, '00:31:35', 1, 1)
  , ('Fullness Of Wind', 2, '00:09:57', 1, 1)
  , ('French Catalogues', 3, '00:05:18', 1, 1)
  , ('Brutal Ardour', 4, '00:08:17', 1, 1)
  , ('Humility', 1, '00:03:17', 2, 2)
  , ('Tranz', 2, '00:02:42', 2, 2)
  , ('Hollywood', 3, '00:04:53', 2, 2)
	, ('Kansas', 4, '00:04:08', 2, 2)
  , ('Sorcererz', 5, '00:03:00', 2, 2)
  , ('Idaho', 6, '00:03:42', 2, 2)
  , ('Lake Zurich', 7, '00:04:12', 2, 2)
  , ('Magic City', 8, '00:03:59', 2, 2)
  , ('Fire Flies', 9, '00:03:53', 2, 2)
  , ('One Percent', 10, '00:02:21', 2, 2)
  , ('Souk Eye', 11, '00:04:34', 2, 2);
