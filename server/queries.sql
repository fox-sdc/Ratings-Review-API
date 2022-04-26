DO $do$
  DECLARE
    array_chars int[]:= array[[2146625, 1], [3060635, 1]];
    i int[];
  BEGIN
    FOREACH i SLICE 1 IN ARRAY array_chars
    LOOP
    UPDATE join_characteristic_votes SET total_score = total_score + i[2],
            total_votes = total_votes + 1
    WHERE char_join_id = i[1];
    END LOOP;
END $do$;

INSERT INTO reviews(
  product_id, rating, summary, body, date, reviewer_name, reviewer_email
)
VALUES (
  65666, 5, 'h', 'hj', 1650931918854, 'bob', 'bob@gmail.com'
)
RETURNING review_id
;