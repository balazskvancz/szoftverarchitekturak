DROP DATABASE IF EXISTS distributorService;

CREATE DATABASE distributorService CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE distributorService;

-- Nyilvántartja, hogy melyik futárnak melyik csomagot kell mikor felvennie.
CREATE TABLE packageDistributions (
  id          INTEGER   AUTO_INCREMENT,
  packageId   INTEGER   NOT NULL,
  courierId   INTEGER   NOT NULL,
  pickUpDate  DATE      NOT NULL,
  pickUpOrder INTEGER   NOT NULL,
  createdAt   DATETIME  NOT NULL,

  PRIMARY KEY (id)
);
