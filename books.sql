drop table books;
CREATE TABLE books (
	id serial PRIMARY KEY,
	author VARCHAR ( 250 ) ,
	title VARCHAR ( 255 ) ,
    isbn VARCHAR(250),
    imge_url VARCHAR(255),
    description VARCHAR(255)
);
