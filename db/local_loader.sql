
--
-- characterisitics reviews file loader query
--

-- \COPY characterisitic
--  FROM '/Users/alexc/HackReactor/SeniorPhase/sdc-csvs/characteristic_reviews.csv'
--  delimiter ',' CSV HEADER;


--
-- loader for all the review data FOR THE TEST DB!!!
--
--  COPY reviews (id, product_id, rating, date, summary, body, recommended, reported, reviewer_name, reviewer_email, response, helpfulness)
--  FROM '/Users/alexc/HackReactor/SeniorPhase/sdc-csvs/reviews.csv'
--  delimiter ',' CSV HEADER;



\COPY Reviews(review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM './../sdc-csvs/reviews.csv' WITH DELIMITER ',' CSV HEADER;

\COPY Photos(photo_id, review_id, url) FROM './../sdc-csvs/reviews_photos.csv' WITH DELIMITER ',' CSV HEADER;

\COPY join_characteristic_votes(char_join_id, product_id, characteristic_name) FROM './../sdc-csvs/characteristics.csv' WITH DELIMITER ',' CSV HEADER;

\COPY initial_char_reviews FROM './../sdc-csvs/characteristic_reviews.csv' WITH DELIMITER ',' CSV HEADER;
