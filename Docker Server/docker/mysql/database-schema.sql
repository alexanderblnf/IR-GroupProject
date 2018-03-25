SET NAMES utf8;
SET time_zone = '+1:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `task` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `experiment`;
CREATE TABLE `experiment` (
  `experiment_id` int(11) NOT NULL AUTO_INCREMENT,
  `experiment` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`experiment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `created_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user_task`;
CREATE TABLE `user_task` (
  `user_task_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  PRIMARY KEY (`user_task_id`),
  CONSTRAINT `user_task_userId_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_task_taskId_fk` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user_experiment`;
CREATE TABLE `user_experiment` (
  `user_experiment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `experiment_id` int(11) NOT NULL,
  PRIMARY KEY (`user_experiment_id`),
  CONSTRAINT `user_experiment_userId_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_experiment_experimentId_fk` FOREIGN KEY (`experiment_id`) REFERENCES `experiment` (`experiment_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `task` (`task`) VALUES
('Cine este Florin Salam?'),
('Cine este Raluca Badulescu'),
('Care este cel mai smeq jurat de la Bravo ai Stil?');

INSERT INTO `experiment` (`experiment`) VALUES
('category-hover, list-hover'),
('category-hover,list-summary'),
('category-list-summary, no-category-list'),
('list-category-summary, category-no-list');
