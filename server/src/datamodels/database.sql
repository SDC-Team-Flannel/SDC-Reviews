CREATE DATABASE sdc_staging;

CREATE TABLE reviews_csv(
  id INT GENERATED ALWAYS AS IDENTITY,
  info TEXT NOT NULL,
  PRIMARY KEY(id)
);

CREATE DATABASE sdc_database;

CREATE TABLE IF NOT EXISTS public.reviews
(
    id serial,
    product_id integer,
    rating smallint,
    date date,
    summary character varying(128),
    body text,
    recommend boolean,
    reported boolean,
    reviewer_name character varying(128),
    reviewer_email character varying(128),
    response text,
    helpfulness smallint,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.characteristics
(
    id serial,
    product_id integer,
    name character varying(128),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.characteristics_reviews
(
    id serial,
    characteristic_id integer,
    review_id integer,
    value smallint,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.reviews_photos
(
    id serial,
    review_id integer,
    url character varying(128),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.characteristics_reviews
    ADD CONSTRAINT review_id FOREIGN KEY (review_id)
    REFERENCES public.reviews (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.reviews_photos
    ADD CONSTRAINT review_id FOREIGN KEY (review_id)
    REFERENCES public.reviews (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
