CREATE DATABASE `my_blog` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `content` text NOT NULL,
  `views` int(11) NOT NULL COMMENT 'count times of viewed',
  `tags` varchar(256) NOT NULL,
  `ctime` int(11) NOT NULL COMMENT 'create time',
  `utime` int(11) NOT NULL COMMENT 'update time',
  PRIMARY KEY (`id`),
  KEY `idx_ctime` (`ctime`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `everyday` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `ctime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_ctime` (`ctime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(64) NOT NULL,
  `ctime` int(11) NOT NULL,
  `utime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_tag_tag` (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `blog_id` int(11) NOT NULL,
  `parent` int(11) NOT NULL,
  `parent_name` varchar(64) NOT NULL DEFAULT '0',
  `user_name` varchar(64) NOT NULL,
  `content` varchar(256) NOT NULL,
  `email` varchar(128) NOT NULL,
  `ctime` int(11) NOT NULL,
  `utime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_blog_id` (`blog_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

CREATE TABLE `tag_blog_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `ctime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tag_id_blog_id` (`tag_id`,`blog_id`),
  KEY `idx_tag_id` (`tag_id`),
  KEY `idx_blog_id` (`blog_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;




