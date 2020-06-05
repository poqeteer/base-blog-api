DROP TABLE `lancteme_blog`.`blog_entries`;

CREATE TABLE IF NOT EXISTS lancteme_blog.blog_entries (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL DEFAULT 1,
  `category` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `create_date` DATETIME NOT NULL,
  `entry` TEXT NOT NULL,
  `src` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `lancteme_blog`.`blog_entries` 
ADD INDEX `date_index` (`create_date` ASC),
ADD INDEX `category_index` (`category` ASC, `create_date` ASC);

INSERT INTO lancteme_blog.blog_entries
(id, user_id, category, title, create_date, entry, src)
VALUES(1, 1, 'Lifestyle', 'If only I had one...', '2020-06-01 00:00:00.0', '# Dreaming - Out of Touch...\n\n-----\n\n## Past\n\nNot here, so move along...\n\n## Present\n\nSo what is this all about? Is it a vanity website? Is it a commercial website? Well, the fact that it has my name all over it says it is a vanity site, but it is an experiment to see what I can produce using tools that exist. Hopefully, it shows both a little of my skill as a developer and some of my feeble attempts at creativity as well.\n\nFirst, this site was written in *React* using the *Grommet* library. Have to say, *Grommet* is ok and does make theming pretty easy but like all things, it isn\'t perfect. I had to tweak it here and there and add extra packages to make it work the way I wanted (like what you are seeing now, a markdown/html hybrid). My biggest complaint is the rigid sizing constraints which are the most annoying. There are no in-between sizes for **medium**, but many versions of **small** and one extra version of **large**. The end product is &quot;ok&quot; but not exactly right.\n\nSecond, I\'m currently unemployed so I\'m just creating stuff, like this website. You may have noticed a certain theme in my choices of photos... Yes, I\'m a devoted, but not very good, tennis player. I\'ve created a small app [RacketTracker](https://lancemock.com/rackettracker) that I use to keep track of the stringing and customization of my tennis rackets. It is free for the first 5 rackets and if you want to track more, there will be a small scheduled fee. \n\n\n## Future\n\nIf I stay unemployed I guess I\'ll keep creating. After working for so long I can\'t imagine doing anything else. I may rewrite this site in another framework like *Vue* which I don\'t know. I already had experience with *Angular*, *Ember*, and *React* (using the *AntDesign* library). I choose to use *React* because it was the latest framework I worked with and I wanted to get this running quickly... \n\nPerhaps I\'ll try and find something else to use to vent my creative boredom on. I can\'t sit here and watch videos for the rest of my life.\n\n-----\n\n#### -Lance.', NULL);
INSERT INTO lancteme_blog.blog_entries
(id, user_id, category, title, create_date, entry, src)
VALUES(2, 1, 'Lifestyle', 'If only I had one...', '2020-06-01 00:00:00.0', '# Lifestyle - If only I had one...\n\n-----\n\nOkay this is filler? May be not. May be so. I really don\'t have a lifestyle, or a life for that matter. In these strange times with fatal viruses and police killings what is a lifestyle?\n\nGranted police kills aren\'t new but latest is really egregious. I think the protests are righteous. I don\'t believe it is an excuse to loot or damage or harm others. That is just wrong.\n\nGetting back on topic... Being stuck inside for days on end. It is necessary, but not a lifestyle.\n\nThere was an article I once read, in of all places Forbes, that I think is appropriate \n\n[The Ten Golden Rules on Living the Good Life](https://www.forbes.com/sites/panosmourdoukoutas/2012/01/14/the-ten-golden-rules-on-living-the-good-life/#491f66fe33fc) (<= Warning! Opens in a tab)\n\nI am not very good at live by the rules but at least I did remember about them... #9 seems to be very appropriate at the moment.\n\n-----\n\n#### -Lance.', NULL);


CREATE TABLE  IF NOT EXISTS `lancteme_blog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `user_name` VARCHAR(45) NULL,
  `create_date` DATETIME NULL,
  `permissions` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

INSERT INTO lancteme_blog.users
(first_name, last_name, user_name, create_date, permissions)
VALUES('Lance', 'Mock', 'lance', '2020-06-04 00:00:00.0', 'admin');



