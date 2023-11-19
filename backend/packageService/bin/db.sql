DROP DATABASE IF EXISTS packageService;

CREATE DATABASE packageService CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE packageService;

CREATE TABLE addresses (
  id          INTEGER         AUTO_INCREMENT,
  country     VARCHAR (255)   NOT NULL,
  postalCode  VARCHAR (10)    NOT NULL,
  city        VARCHAR (255)   NOT NULL,
  street      VARCHAR (255)   NOT NULL,
  house       VARCHAR (10)    NOT NULL,
  longitude   DOUBLE (10, 7)  NOT NULL,
  latitude    DOUBLE (10, 7)  NOT NULL,
  createdAt   DATETIME        NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE dimensions (
  id        INTEGER         AUTO_INCREMENT,
  length    DOUBLE (10, 2)  NOT NULL,
  depth     DOUBLE (10, 2)  NOT NULL,
  width     DOUBLE (10, 2)  NOT NULL,
  createdAt DATETIME        NOT NULL,
  deletedAt DATETIME        DEFAULT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE packages (
  id                INTEGER       AUTO_INCREMENT,
  senderId          INTEGER       NOT NULL,
  pickUpAddressId   INTEGER       NOT NULL,
  destAddressId     INTEGER       NOT NULL,
  receiverEmail     VARCHAR (255) NOT NULL,
  receiverName      VARCHAR (255) NOT NULL,
  dimensionId       INTEGER       NOT NULL,
  weight            DOUBLE (5, 2) NOT NULL,
  qrCode            VARCHAR (255) DEFAULT NULL,
  createdAt         DATETIME      NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE packageLifecycles (
  id        INTEGER       AUTO_INCREMENT,
  packageId INTEGER       NOT NULL,
  userId    INTEGER       NOT NULL,
  action    VARCHAR (25)  NOT NULL,
  createdAt DATETIME      NOT NULL,

  PRIMARY KEY (id)
);
