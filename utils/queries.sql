--Database
CREATE DATABASE freelance_projects
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Users table
CREATE TABLE users (
  id_user serial NOT NULL PRIMARY KEY, 
  email varchar(45) NOT NULL UNIQUE, 
  password varchar(45) NOT NULL, 
  user_name varchar(255) UNIQUE,
  admin boolean NOT NULL, 
  firstname varchar(45) NOT NULL, 
  surename varchar(100) NOT NULL
);

-- Favourites table
CREATE TABLE favourites (
  id_user int,
  id_project varchar(45),
  FOREIGN KEY (id_user) REFERENCES users(id_user)
  ON DELETE CASCADE
);