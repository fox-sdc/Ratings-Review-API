
--
-- characterisitics reviews file loader query
--

\COPY characterisitic
 FROM '/Users/alexc/HackReactor/SeniorPhase/sdc-csvs/characteristic_reviews.csv'
 delimiter ',' CSV HEADER;
