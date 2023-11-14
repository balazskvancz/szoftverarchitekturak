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
  role      VARCHAR (10)  NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE couriers (
  userId    INTEGER       NOT NULL,
  phoneNum  VARCHAR (50)  DEFAULT NULL,

  PRIMARY KEY (userId)
);

CREATE TABLE courierWorkingDays (
  id          INTEGER   AUTO_INCREMENT,
  userId      INTEGER   NOT NULL,
  day         DATE      NOT NULL,
  createdAt   DATETIME  NOT NULL,

  PRIMARY KEY (userId, day)
);

CREATE TABLE customers (
  userId    INTEGER       NOT NULL,
  phoneNum  VARCHAR (50)  DEFAULT NULL,

  PRIMARY KEY (userId)
);

CREATE TABLE customerAddresses (
  userId      INTEGER   NOT NULL,
  addressId   INTEGER   NOT NULL,
  createdAt   DATETIME  NOT NULL,

  PRIMARY KEY (userId, addressId)
);
