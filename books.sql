drop table books;
CREATE TABLE books (
	id serial PRIMARY KEY,
    author_id INT, 
	title VARCHAR ( 255 ) ,
    isbn VARCHAR(255),
    imge_url VARCHAR(255),
    description VARCHAR
);
CREATE TABLE AUTHORS (id SERIAL PRIMARY KEY, name VARCHAR(255));
ALTER TABLE books ADD CONSTRAINT fk_authors FOREIGN KEY (author_id) REFERENCES authors(id);
-- INSERT INTO authors(name) SELECT DISTINCT author FROM books;
-- ALTER TABLE books ADD COLUMN author_id INT;
-- UPDATE books SET author_id=author.id FROM (SELECT * FROM authors) AS author WHERE books.author = author.name;
-- ALTER TABLE books DROP COLUMN author;
