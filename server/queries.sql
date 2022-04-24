
-- Review information for a specific product
SELECT c.characteristic_name, j.characteristic_id, (j.total_score::decimal / j.total_votes) AS score
FROM (SELECT * FROM join_characteristic_votes) j
JOIN characteristics as c ON (characteristic_id = characteristics_id)
WHERE product_id = 65666
ORDER BY characteristic_id ASC;

 characteristic_name | characteristic_id |       score
---------------------+-------------------+--------------------
 Comfort             |                 1 | 3.0000000000000000
 Fit                 |                 2 | 3.6666666666666667
 Quality             |                 3 | 2.5000000000000000
 Length              |                 4 | 4.1666666666666667


SELECT
  (SELECT meta
    FROM (
      SELECT
          JSON_BUILD_OBJECT(
            '1', meta.rating_1,
            '2', meta.rating_2,
            '3', meta.rating_3,
            '4', meta.rating_4,
            '5', meta.rating_5
          ) AS meta
        FROM meta
        WHERE meta.product_id = 65666
      ) AS meta
    ) as ratings;

                      meta
-------------------------------------------------
 [{"1" : 1, "2" : 0, "3" : 0, "4" : 2, "5" : 3}]






UPDATE join_characteristic_votes SET total_score = calc.score, total_votes = calc.votes
FROM (SELECT characteristic_id, SUM(value) as score, COUNT(value) as votes
FROM initial_char_reviews
GROUP BY characteristic_id) AS calc
WHERE join_characteristic_votes.char_join_id = calc.characteristic_id;


                  SELECT characteristics.characteristic_name
                  FROM characteristics
                  JOIN join_characteristic_votes ON (join_characteristic_votes.characteristic_id = characteristics.characteristics_id)
                  WHERE join_characteristic_votes.characteristic_id = characteristics.characteristics_id AND product_id = 65666