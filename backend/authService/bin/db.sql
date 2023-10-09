DROP DATABASE IF EXISTS authService;

CREATE DATABASE authService CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE authService;

CREATE TABLE sessions (
  loginHash VARCHAR (155) NOT NULL,
  userId INTEGER NOT NULL,
  startedAt DATETIME NOT NULL,
  endedAt DATETIME DEFAULT NULL,

  PRIMARY KEY (loginHash)
);
