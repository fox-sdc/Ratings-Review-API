-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Reviews'
--
-- ---
-- Add contraints to be more intentful

DROP TABLE IF EXISTS "Reviews";

CREATE TABLE "Reviews" (
  "review_id" BIGSERIAL NOT NULL,
  "rating" INT NULL DEFAULT NULL,
  "summary" VARCHAR(500) NULL DEFAULT NULL,
  "recommended" bit NOT NULL DEFAULT NULL,
  "helpfulness" INT NULL DEFAULT NULL,
  "reported" BOOLEAN NULL DEFAULT NULL,
  "new field" INT NULL DEFAULT NULL,
  "body" VARCHAR(1000) NULL DEFAULT NULL,
  "product_id_product" INT NOT NULL,
  "date" TIMESTAMP NOT NULL,
  "response_id_reponses" INT NULL DEFAULT NULL,
  "photo_id_photos" INT NULL DEFAULT NULL,
  "reviewer_id_reviewers" INT NULL DEFAULT NULL,
  PRIMARY KEY ("review_id")
);

-- ---
-- Table 'product'
--
-- ---

DROP TABLE IF EXISTS "Product";

CREATE TABLE "Product" (
  "product_id" BIGSERIAL NOT NULL,
  PRIMARY KEY ("product_id")
);

-- ---
-- Table 'Characterisitics'
--
-- ---

DROP TABLE IF EXISTS "Characterisitics";

CREATE TABLE "Characterisitics" (
  "id" BIGSERIAL NOT NULL,
  "width_value" INT NULL DEFAULT NULL,
  "comfort_value" INT NULL DEFAULT NULL,
  "rating_1" INT NULL DEFAULT NULL,
  "rating_2" INT NULL DEFAULT NULL,
  "rating_3" INT NULL DEFAULT NULL,
  "rating_4" INT NULL DEFAULT NULL,
  "rating_5" INT NULL DEFAULT NULL,
  "total_recommended_true" INT NULL DEFAULT NULL,
  "quality_value" INT NULL DEFAULT NULL,
  "total_recommended_false" INT NULL DEFAULT NULL,
  "width_id" INT NULL DEFAULT NULL,
  "comfort_id" INT NULL DEFAULT NULL,
  "quality_id" INT NULL DEFAULT NULL,
  "product_id_product" INT NOT NULL,
  PRIMARY KEY ("id")
);

-- ---
-- Table 'reponses'
--
-- ---

DROP TABLE IF EXISTS "Reponses";

CREATE TABLE "Reponses" (
  "response_id" BIGSERIAL NOT NULL,
  "reponse" VARCHAR(1000) NULL DEFAULT NULL,
  PRIMARY KEY ("response_id")
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS "Photos";

CREATE TABLE "Photos" (
  "photo_id" BIGSERIAL NOT NULL,
  "url" VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY ("photo_id")
);

-- ---
-- Table 'reviewers'
--
-- ---

DROP TABLE IF EXISTS "Reviewers";

CREATE TABLE "Reviewers" (
  "reviewer_id" BIGSERIAL NOT NULL,
  "name" VARCHAR(25) NULL DEFAULT NULL,
  "username" VARCHAR(50) NULL DEFAULT NULL,
  "email" VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY ("reviewer_id")
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE "Reviews" ADD FOREIGN KEY (product_id_product) REFERENCES "Product" ("product_id");
ALTER TABLE "Reviews" ADD FOREIGN KEY (response_id_reponses) REFERENCES "Reponses" ("response_id");
ALTER TABLE "Reviews" ADD FOREIGN KEY (photo_id_photos) REFERENCES "Photos" ("photo_id");
ALTER TABLE "Reviews" ADD FOREIGN KEY (reviewer_id_reviewers) REFERENCES "Reviewers" ("reviewer_id");
ALTER TABLE "Characterisitics" ADD FOREIGN KEY (product_id_product) REFERENCES "Product" ("product_id");

-- ---
-- Table Properties
-- ---

-- ALTER TABLE "Reviews" ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE "product" ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE "characterisitics" ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE "reponses" ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE "photos" ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE "reviewers" ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO "Reviews" ("review_id","rating","summary","recommended","helpfulness","reported","new field","body","product_id_product","date","response_id_reponses","photo_id_photos","reviewer_id_reviewers") VALUES
-- ('','','','','','','','','','','','','');
-- INSERT INTO "product" ("product_id") VALUES
-- ('');
-- INSERT INTO "characterisitics" ("id","width_value","comfort_value","rating_1","rating_2","rating_3","rating_4","rating_5","total_recommended_true","quality_value","total_recommended_false","width_id","comfort_id","quality_id","product_id_product") VALUES
-- ('','','','','','','','','','','','','','','');
-- INSERT INTO "reponses" ("response_id","reponse") VALUES
-- ('','');
-- INSERT INTO "photos" ("photo_id","url") VALUES
-- ('','');
-- INSERT INTO "reviewers" ("reviewer_id","name","username","email") VALUES
-- ('','','','');


