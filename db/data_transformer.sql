DROP TABLE IF EXISTS Characteristics, Meta;

CREATE TABLE Meta (
  product_id BIGSERIAL UNIQUE PRIMARY KEY,
  recommended_true_vote integer NOT NULL DEFAULT 0,
  recommended_false_vote integer NOT NULL DEFAULT 0,
  rating_1 integer NOT NULL DEFAULT 0,
  rating_2 integer NOT NULL DEFAULT 0,
  rating_3 integer NOT NULL DEFAULT 0,
  rating_4 integer NOT NULL DEFAULT 0,
  rating_5 integer NOT NULL DEFAULT 0
);


CREATE TABLE Characteristics (
  characteristics_id BIGSERIAL UNIQUE PRIMARY KEY,
  characteristic_name varchar(40) NOT NULL
);

/* ---------- CHARACTERISTIC TABLE CONSTRUCTION ---------- */

INSERT INTO Characteristics(characteristic_name) SELECT DISTINCT characteristic_name FROM join_characteristic_votes;

ALTER TABLE join_characteristic_votes ADD COLUMN characteristic_id smallint;

UPDATE join_characteristic_votes SET characteristic_id=characteristics_id
FROM Characteristics
WHERE join_characteristic_votes.characteristic_name=Characteristics.characteristic_name;

UPDATE join_characteristic_votes SET total_score = calc.score, total_votes = calc.votes
FROM (SELECT characteristic_id, SUM(value) as score, COUNT(value) as votes
FROM initial_char_reviews
GROUP BY characteristic_id) AS calc
WHERE join_characteristic_votes.char_join_id = calc.characteristic_id;

ALTER TABLE join_characteristic_votes DROP COLUMN characteristic_name;

DROP TABLE initial_char_reviews;


/* ---------- META TABLE CONSTRUCTION ---------- */

INSERT INTO Meta(product_id) SELECT DISTINCT product_id FROM Reviews;

/* count of each rating per product */


UPDATE Meta SET rating_1=count
FROM (SELECT product_id, COUNT(rating)
FROM reviews
WHERE rating=1
GROUP BY product_id) AS c
WHERE Meta.product_id=c.product_id;

UPDATE Meta SET rating_2=count
FROM (SELECT product_id, COUNT(rating)
FROM reviews
WHERE rating=2
GROUP BY product_id) AS c
WHERE Meta.product_id=c.product_id;

UPDATE Meta SET rating_3=count
FROM (SELECT product_id, COUNT(rating)
FROM reviews
WHERE rating=3
GROUP BY product_id) AS c
WHERE Meta.product_id=c.product_id;

UPDATE Meta SET rating_4=count
FROM (SELECT product_id, COUNT(rating)
FROM reviews
WHERE rating=4
GROUP BY product_id) AS c
WHERE Meta.product_id=c.product_id;

UPDATE Meta SET rating_5=count
FROM (SELECT product_id, COUNT(rating)
FROM reviews
WHERE rating=5
GROUP BY product_id) AS c
WHERE Meta.product_id=c.product_id;

/* count of recommended votes per product */

UPDATE Meta SET recommended_true_vote=count
FROM (SELECT product_id, COUNT(recommend)
FROM reviews
WHERE recommend=true
GROUP BY product_id) AS c
WHERE Meta.product_id=c.product_id;

UPDATE Meta SET recommended_false_vote=count
FROM (SELECT product_id, COUNT(recommend)
FROM reviews
WHERE recommend=false
GROUP BY product_id) AS c
WHERE Meta.product_id=c.product_id;

-- Bug fit : need to sync keys after mass upload

SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"reviews"', 'review_id')), (SELECT (MAX("review_id") + 1) FROM "reviews"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"photos"', 'photo_id')), (SELECT (MAX("photo_id") + 1) FROM "photos"), FALSE);

CREATE INDEX reviews_product_id ON reviews (product_id);

CREATE INDEX photos_review_id ON photos (review_id);

CREATE INDEX join_characteristic_votes_product_id ON join_characteristic_votes (product_id);