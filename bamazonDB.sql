DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	price INTEGER(10) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Coffee Mug",20,10);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Bike Helmet",25,5);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Key Chain",5,100);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Foam Roller",29.99,20);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Avocados",4,1000);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Water Filter",30,500);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Flat Screen TV",900,10);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Board Game",15,200);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Plant",9,40);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Snuggie",15,300);