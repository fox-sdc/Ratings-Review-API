\c postgres;
DROP DATABASE IF EXISTS ratings;
CREATE DATABASE ratings;
\c ratings;

DROP TABLE IF EXISTS Reviews, Photos, join_characteristic_votes, initial_char_reviews;


CREATE TABLE Reviews (
	review_id BIGSERIAL UNIQUE PRIMARY KEY,
	product_id integer NOT NULL,
	rating smallint NOT NULL CHECK (rating > 0 AND rating < 6),
	date bigint NOT NULL,
	summary varchar(255) NOT NULL,
	body varchar(1000) NOT NULL,
	recommend BOOLEAN NOT NULL DEFAULT false,
	reported BOOLEAN NOT NULL DEFAULT false,
	reviewer_name varchar(50) NOT NULL,
	reviewer_email varchar(50) NOT NULL,
	response varchar(255) DEFAULT null,
	helpfulness integer NOT NULL DEFAULT 0
);

CREATE TABLE Photos (
  photo_id BIGSERIAL,
  url varchar(255) DEFAULT NULL,
  review_id integer NOT NULL
);

CREATE TABLE join_characteristic_votes (
  char_join_id BIGSERIAL UNIQUE PRIMARY KEY,
  product_id integer NOT NULL,
  characteristic_name varchar(40) NOT NULL,
  total_score integer NOT NULL DEFAULT 0,
  total_votes integer NOT NULL DEFAULT 0
);

CREATE TABLE initial_char_reviews (
  to_join_id BIGSERIAL UNIQUE PRIMARY KEY,
  characteristic_id integer,
  review_id integer NOT NULL,
  value smallint NOT NULL
);