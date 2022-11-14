-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS gryffindor;
DROP TABLE IF EXISTS hufflepuff;
DROP TABLE IF EXISTS ravenclaw;
DROP TABLE IF EXISTS slytherin;
DROP TABLE IF EXISTS death_eaters;


CREATE TABLE gryffindor (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR
);

CREATE TABLE hufflepuff (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR
);

CREATE TABLE ravenclaw (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    wand_model BIGINT
);

CREATE TABLE slytherin (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR
);

CREATE TABLE death_eaters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    douchery_level BIGINT
);

INSERT INTO gryffindor (
    first_name,
    last_name
)
VALUES
    ('Harry', 'Potter'),
    ('Ron', 'Weasley'),
    ('Hermione', 'Granger'),
    ('Neville', 'Longbottom'),
    ('Ginny', 'Weasley')
    ;

INSERT INTO hufflepuff (
    first_name,
    last_name
)
VALUES
    ('Cedric', 'Diggory'),
    ('Helga', 'Hufflepuff'),
    ('Newt', 'Scamander'),
    ('Pamona', 'Sprout'),
    ('Bridget', 'Wenlock')
    ;

INSERT INTO ravenclaw (
    name,
    wand_model
)
VALUES
    ('Luna Lovegood', 20101),
    ('Rowena Ravenclaw', 40568),
    ('Garrick Olivander', 19385),
    ('Filius Flitwick', 69303),
    ('Gilderoy Lockhart', 49605)
    ;

INSERT INTO slytherin (
    first_name,
    last_name
)
VALUES
    ('Draco', 'Malfoy'),
    ('Salazar', 'Slytherin'),
    ('Severus', 'Snape'),
    ('Tom', 'Riddle'),
    ('Horace', 'Slughorn')
    ;

INSERT INTO death_eaters (
    name,
    douchery_level
)
VALUES
    ('Lord Voldemort', 100),
    ('Bellatrix Lestrange', 74),
    ('Lucius Malfoy', 52),
    ('Pius Thicknesse', 10),
    ('Stan Shunpike', 2)
    ;