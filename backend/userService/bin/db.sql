DROP DATABASE IF EXISTS userService;

CREATE DATABASE userService CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE userService;

CREATE TABLE users (
  id        INTEGER       AUTO_INCREMENT,
  name      VARCHAR (128) NOT NULL,
  email     VARCHAR (128) NOT NULL,
  password  VARCHAR (255) NOT NULL,
  createdAt DATETIME      NOT NULL,
  deletedAt DATETIME      DEFAULT NULL,
 -- role VARCHAR ()

  PRIMARY KEY (id)
);
