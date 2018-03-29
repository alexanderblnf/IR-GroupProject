SET NAMES utf8;
SET time_zone = '+1:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
	`task_id` INT(11)       NOT NULL AUTO_INCREMENT,
	`task`    VARCHAR(1000) NOT NULL,
	PRIMARY KEY (`task_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `experiment`;
CREATE TABLE `experiment` (
	`experiment_id` INT(11)      NOT NULL AUTO_INCREMENT,
	`interface1`    VARCHAR(255) NOT NULL,
	`interface2`    VARCHAR(255) NOT NULL,
	PRIMARY KEY (`experiment_id`)
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`user_id`            INT(11)      NOT NULL AUTO_INCREMENT,
	`username`           VARCHAR(255) NOT NULL,
	`created_time`       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`age`                INT(11)      NOT NULL,
	`gender`             VARCHAR(30)  NOT NULL,
	`student`            VARCHAR(4)   NOT NULL,
	`course_participant` VARCHAR(4)   NOT NULL,
	`experiment_id`      INT(11)      NOT NULL,
	PRIMARY KEY (`user_id`),
	CONSTRAINT `user_experiment_fk` FOREIGN KEY (`experiment_id`) REFERENCES `experiment` (`experiment_id`)
		ON DELETE CASCADE
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `user_task`;
CREATE TABLE `user_task` (
	`user_task_id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_id`      INT(11) NOT NULL,
	`task_id`      INT(11) NOT NULL,
	`status`       INT(2)           DEFAULT -1,
	`hover`        INT(11),
	`click`        INT(11),
	`time`         INT(11),
	`queries`      INT(11),
	PRIMARY KEY (`user_task_id`),
	CONSTRAINT `user_task_userId_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
		ON DELETE CASCADE,
	CONSTRAINT `user_task_taskId_fk` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`)
		ON DELETE CASCADE
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `user_experiment`;
CREATE TABLE `user_experiment` (
	`user_experiment_id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_id`            INT(11) NOT NULL,
	`experiment_id`      INT(11) NOT NULL,
	PRIMARY KEY (`user_experiment_id`),
	CONSTRAINT `user_experiment_userId_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
		ON DELETE CASCADE,
	CONSTRAINT `user_experiment_experimentId_fk` FOREIGN KEY (`experiment_id`) REFERENCES `experiment` (`experiment_id`)
		ON DELETE CASCADE
)
	ENGINE = InnoDB
	DEFAULT CHARSET = utf8;

INSERT INTO `task` (`task`) VALUES
	('What is the standard length of a cue used for playing billiards?'),
	('How much optical zoom does the compact digital camera Sony Cyber-Shot W530 have?'),
	('The new Huawei P20 is out just a few days ago. In what colours can you get it (the colour of itself—not the colour of additional cases for it)?'),
	('Find the mortgage calculator on the Commonwealth Bank website where you can calculate mortgage rates for financing a new home.'),
	('You bought a laptop from Dell and something doesnt work as expected. Find the page for Dell technical support.'),
	('You want to find three movies that were originally released in a language other than English. The movies should be published by Paramount Pictures.'),
	('You want to find three science fiction books published after 2000 that have stories involving robots.'),
	('What is heavy alpha chain disease?'),
	('You are a 60-year-old menopausal woman without hormone replacement therapy. You want to know if there are adverse effects on lipids when progesterone is given with estrogen replacement therapy.'),
	('You are a patient with cerebral palsy and depression. You want to know about the relationship between cerebral palsy and depression.'),
	('How do bees choose where to build their new homes?'),
	('How hot can it be, on average, in July in Aachen, Germany?'),
	('How many euros do you get if you exchange 10,000 units of the currency of Lithuania?'),
	('What researchers did significant work on lyrics classification using Probabilistic latent semantic analysis in 2004?');

INSERT INTO `experiment` (`interface1`, `interface2`) VALUES
	('category-hover', 'list-hover'),
	('category-hover', 'list-summary'),
	('category-list-summary', 'no-category-list'),
	('list-category-summary', 'category-no-list');
