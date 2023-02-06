BEGIN;

DROP TABLE IF EXISTS users,products,history,cart;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phonenumber VARCHAR(255),
   password VARCHAR(255)
);
 CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(255),
    image VARCHAR(255),
    name VARCHAR(255), 
    price NUMERIC NOT NULL,
    category VARCHAR(255)
);
 CREATE TABLE history(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    product_id VARCHAR(255),
    image VARCHAR(255),
    name VARCHAR(255), 
    price NUMERIC NOT NULL,
    category VARCHAR(255)
);
 CREATE TABLE cart(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    product_id VARCHAR(255),
    image VARCHAR(255),
    name VARCHAR(255), 
    price NUMERIC NOT NULL,
    category VARCHAR(255)
);



COMMIT;