SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


-- CREATE DATABASE myApp;
-- CREATE DATABASE `catalog` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `myApp`;



CREATE TABLE IF NOT EXISTS `sejururis` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `titlu` varchar(30) DEFAULT NULL,
  `destinatie` varchar(500) DEFAULT NULL,
  `pret` float(5),
  `durata` int(4),
  `link` varchar(255),
   `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `voucheres` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `id_sejur` smallint(5),
  `valoare` int(4) DEFAULT NULL,
  `end_date` timestamp,
  `status` smallint(4),
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_sejur`)
        REFERENCES sejur(`id`)
        ON DELETE CASCADE
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `wishlist` (
  `id_wishlist` smallint(5) NOT NULL AUTO_INCREMENT,
  `id_sejur` smallint(5),
  `suma` float(5),
  PRIMARY KEY (`id_wishlist`),
  FOREIGN KEY (`id_sejur`)
        REFERENCES sejur(`id_sejur`)
        ON DELETE CASCADE
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


UPDATE TABLE sejururis SET link='unLink' WHERE id=1;

INSERT INTO sejururis(titlu, destinatie, pret, durata, link) values('Vacanta Grecia','Mikonos',300,5,"link");

INSERT INTO voucheres(id_sejur, valoare, end_date, status) values(1, 15, str_to_date('21-12-2020','%d-%m-%Y'), 0);