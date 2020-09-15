DROP TABLE IF EXISTS appuser;
CREATE TABLE appuser (
  id serial NOT NULL
, email text NOT NULL
, password text NOT NULL
, username text NOT NULL
, firstname text NOT NULL
, lastname text NOT NULL
, CONSTRAINT user_pk PRIMARY KEY (id)
);

DROP TABLE IF EXISTS genre;
CREATE TABLE genre (
  id serial NOT NULL
, name text NOT NULL
, CONSTRAINT genre_pk PRIMARY KEY (id)
);

DROP TABLE IF EXISTS label;
CREATE TABLE label (
  id serial NOT NULL
, name text NOT NULL
, profile text
, url text
, CONSTRAINT label_pk PRIMARY KEY (id)
);

DROP TABLE IF EXISTS format;
CREATE TABLE format (
  id serial NOT NULL
, name text NOT NULL
, CONSTRAINT format_pk PRIMARY KEY (id)
);

DROP TABLE IF EXISTS country;
CREATE TABLE country (
  id serial NOT NULL
, name text NOT NULL
, iso char(2) NOT NULL
, CONSTRAINT country_pk PRIMARY KEY (id)
);

DROP TABLE IF EXISTS artist;
CREATE TABLE artist (
  id serial NOT NULL
, name text NOT NULL
, profile text
, CONSTRAINT artist_pk PRIMARY KEY (id)
);

DROP TABLE IF EXISTS style;
CREATE TABLE style (
  id serial NOT NULL
, CONSTRAINT style_pk PRIMARY KEY (id)
, name text NOT NULL
, genre_id integer REFERENCES genre(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS release;
CREATE TABLE release (
  id serial NOT NULL
, title text NOT NULL
, format_details text NOT NULL
, catno text
, release_date date NOT NULL
, create_date date NOT NULL
, CONSTRAINT release_pk PRIMARY KEY (id)
, appuser_id integer not null references appuser(id)
, label_id integer not null references label(id)
, format_id integer not null references format(id)
, country_id integer references country(id)
);

DROP TABLE IF EXISTS image;
CREATE TABLE image (
  id serial NOT NULL
, CONSTRAINT image_pk PRIMARY KEY (id)
, name text NOT NULL
, data bytea NOT NULL
, mimeType text NOT NULL;
, release_id integer REFERENCES release(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS song;
CREATE TABLE song (
  title text NOT NULL
, position integer NOT NULL
, length time NOT NULL
, release_id integer not null references release(id)
, artist_id integer not null references artist(id)
, CONSTRAINT song_pk PRIMARY KEY (position, release_id, artist_id)
);

DROP TABLE IF EXISTS release_artist;
CREATE TABLE release_artist (
  release_id integer REFERENCES release (id) ON UPDATE CASCADE ON DELETE CASCADE
, artist_id integer REFERENCES artist (id) ON UPDATE CASCADE
, CONSTRAINT release_fk FOREIGN KEY(release_id) REFERENCES release(id)
, CONSTRAINT artist_fk FOREIGN KEY(artist_id) REFERENCES artist(id)
, CONSTRAINT release_artist_pkey PRIMARY KEY (release_id, artist_id)
);

DROP TABLE IF EXISTS release_genre;
CREATE TABLE release_genre (
  release_id integer REFERENCES release (id) ON UPDATE CASCADE ON DELETE CASCADE
, genre_id integer REFERENCES genre (id) ON UPDATE CASCADE
, CONSTRAINT release_fk FOREIGN KEY(release_id) REFERENCES release(id)
, CONSTRAINT genre_fk FOREIGN KEY(genre_id) REFERENCES genre(id)
, CONSTRAINT release_genre_pkey PRIMARY KEY (release_id, genre_id)
);

-- INSERT DATA --
INSERT INTO appuser(id, email, password, username, firstname, lastname)
	VALUES (1, 'mail@mail.com', '123456', 'vboukonis', 'Vasilis', 'Boukonis');

INSERT INTO label(id, name, profile, url)
	VALUES (1, 'Virgin EMI Records', 'Virgin EMI Records is a British record label owned by the Universal Music Group. It was founded in March 2013 through the merger of Mercury Records Ltd. (UK) and Virgin Records Ltd.. It operates two distinct A&R and marketing streams – Virgin and EMI Records. In June 2020, the label was renamed EMI Records, and will continue to operate Virgin Records as an imprint of the new EMI Records.', 'https://www.virginemirecords.com/')
  , (2, 'Parlophone', 'Record (holding) company operating from the 4th June 2013. (Formerly known as EMI Records Ltd.)\nAny release with this company is June 2013 or later.\nFor the main label name, use Parlophone.\nSometimes listed as \"\"Parlophone Records Limited\"\"\n\nPrincipal activities - sale and distribution of recorded music (license / copyright holder). since 2013 Parlophone Records Ltd. has been the immediate registered owner of the Parlophone, Regal, Stateside, Food, Zonophone, Compulsion, Cooltempo and Ensign imprints (trademarks)\n\nCompany history:\nEMI Records Ltd., since incorporation was an immediate subsidiary of EMI Ltd., and as of 2011 formed part of the recorded music division of EMI Group Ltd. (Formerly known as EMI Group Plc) On the 11th Nov 2011, Citygroup (ultimate owner of EMI Group Ltd.) signed a definitive agreement to sell EMI Group Ltd., and its various worldwide operating companies to Vivendi SA. The transaction was subject to certain regulatory approvals. Regulatory approvals were obtained with the requirements of certain divestments, the sale completed on the 28th September 2012.\n\nAs a condition of the sale to Vivendi SA. (owner of the various companies that formed part of the Universal Music Group), the regulatory authorites required certain record business''s owned by EMI Group Ltd. to be divested. The Parlophone Label Group (PLG Holdco Ltd.) which the company forms part of was created for this divestment. On the 6th Feb 2013 it was announced that a definitive agreement had been entered into to sell the The Parlophone Label Group to the Warner Music Group, Inc. (Warner Music Group) and this transaction was completed on the 1st July 2013. As of that date Parlophone Records Ltd., became an indirect subsidiary of Warner Music Group, Inc.\nIn June 2016 the company sold its wholly owned subsidiary Chrysalis Records Ltd. to Blue Raincoat Music Ltd.', 'http://www.parlophone.co.uk/');

INSERT INTO format(id, name)
	VALUES (1, 'Vinyl')
  , (2, 'CD')
  , (3, 'mp3');

INSERT INTO country VALUES (1,'Andorra','ad'),(2,'United Arab Emirates','ae'),(3,'Afghanistan','af'),(4,'Antigua and Barbuda','ag'),(5,'Anguilla','ai'),(6,'Albania','al'),(7,'Armenia','am'),(8,'Netherlands Antilles','an'),(9,'Angola','ao'),(10,'Argentina','ar'),(11,'Austria','at'),(12,'Australia','au'),(13,'Aruba','aw'),(14,'Azerbaijan','az'),(15,'Bosnia and Herzegovina','ba'),(16,'Barbados','bb'),(17,'Bangladesh','bd'),(18,'Belgium','be'),(19,'Burkina Faso','bf'),(20,'Bulgaria','bg'),(21,'Bahrain','bh'),(22,'Burundi','bi'),(23,'Benin','bj'),(24,'Bermuda','bm'),(25,'Brunei Darussalam','bn'),(26,'Bolivia','bo'),(27,'Brazil','br'),(28,'Bahamas','bs'),(29,'Bhutan','bt'),(30,'Botswana','bw'),(31,'Belarus','by'),(32,'Belize','bz'),(33,'Canada','ca'),(34,'Cocos (Keeling) Islands','cc'),(35,'Democratic Republic of the Congo','cd'),(36,'Central African Republic','cf'),(37,'Congo','cg'),(38,'Switzerland','ch'),(39,'Cote D''Ivoire (Ivory Coast)','ci'),(40,'Cook Islands','ck'),(41,'Chile','cl'),(42,'Cameroon','cm'),(43,'China','cn'),(44,'Colombia','co'),(45,'Costa Rica','cr'),(46,'Cuba','cu'),(47,'Cape Verde','cv'),(48,'Christmas Island','cx'),(49,'Cyprus','cy'),(50,'Czech Republic','cz'),(51,'Germany','de'),(52,'Djibouti','dj'),(53,'Denmark','dk'),(54,'Dominica','dm'),(55,'Dominican Republic','do'),(56,'Algeria','dz'),(57,'Ecuador','ec'),(58,'Estonia','ee'),(59,'Egypt','eg'),(60,'Western Sahara','eh'),(61,'Eritrea','er'),(62,'Spain','es'),(63,'Ethiopia','et'),(64,'Finland','fi'),(65,'Fiji','fj'),(66,'Falkland Islands (Malvinas)','fk'),(67,'Federated States of Micronesia','fm'),(68,'Faroe Islands','fo'),(69,'France','fr'),(70,'Gabon','ga'),(71,'Great Britain (UK)','gb'),(72,'Grenada','gd'),(73,'Georgia','ge'),(74,'French Guiana','gf'),(75,'NULL','gg'),(76,'Ghana','gh'),(77,'Gibraltar','gi'),(78,'Greenland','gl'),(79,'Gambia','gm'),(80,'Guinea','gn'),(81,'Guadeloupe','gp'),(82,'Equatorial Guinea','gq'),(83,'Greece','gr'),(84,'S. Georgia and S. Sandwich Islands','gs'),(85,'Guatemala','gt'),(86,'Guinea-Bissau','gw'),(87,'Guyana','gy'),(88,'Hong Kong','hk'),(89,'Honduras','hn'),(90,'Croatia (Hrvatska)','hr'),(91,'Haiti','ht'),(92,'Hungary','hu'),(93,'Indonesia','id'),(94,'Ireland','ie'),(95,'Israel','il'),(96,'India','in'),(97,'Iraq','iq'),(98,'Iran','ir'),(99,'Iceland','is'),(100,'Italy','it'),(101,'Jamaica','jm'),(102,'Jordan','jo'),(103,'Japan','jp'),(104,'Kenya','ke'),(105,'Kyrgyzstan','kg'),(106,'Cambodia','kh'),(107,'Kiribati','ki'),(108,'Comoros','km'),(109,'Saint Kitts and Nevis','kn'),(110,'Korea (North)','kp'),(111,'Korea (South)','kr'),(112,'Kuwait','kw'),(113,'Cayman Islands','ky'),(114,'Kazakhstan','kz'),(115,'Laos','la'),(116,'Lebanon','lb'),(117,'Saint Lucia','lc'),(118,'Liechtenstein','li'),(119,'Sri Lanka','lk'),(120,'Liberia','lr'),(121,'Lesotho','ls'),(122,'Lithuania','lt'),(123,'Luxembourg','lu'),(124,'Latvia','lv'),(125,'Libya','ly'),(126,'Morocco','ma'),(127,'Monaco','mc'),(128,'Moldova','md'),(129,'Madagascar','mg'),(130,'Marshall Islands','mh'),(131,'Macedonia','mk'),(132,'Mali','ml'),(133,'Myanmar','mm'),(134,'Mongolia','mn'),(135,'Macao','mo'),(136,'Northern Mariana Islands','mp'),(137,'Martinique','mq'),(138,'Mauritania','mr'),(139,'Montserrat','ms'),(140,'Malta','mt'),(141,'Mauritius','mu'),(142,'Maldives','mv'),(143,'Malawi','mw'),(144,'Mexico','mx'),(145,'Malaysia','my'),(146,'Mozambique','mz'),(147,'Namibia','na'),(148,'New Caledonia','nc'),(149,'Niger','ne'),(150,'Norfolk Island','nf'),(151,'Nigeria','ng'),(152,'Nicaragua','ni'),(153,'Netherlands','nl'),(154,'Norway','no'),(155,'Nepal','np'),(156,'Nauru','nr'),(157,'Niue','nu'),(158,'New Zealand (Aotearoa)','nz'),(159,'Oman','om'),(160,'Panama','pa'),(161,'Peru','pe'),(162,'French Polynesia','pf'),(163,'Papua New Guinea','pg'),(164,'Philippines','ph'),(165,'Pakistan','pk'),(166,'Poland','pl'),(167,'Saint Pierre and Miquelon','pm'),(168,'Pitcairn','pn'),(169,'Palestinian Territory','ps'),(170,'Portugal','pt'),(171,'Palau','pw'),(172,'Paraguay','py'),(173,'Qatar','qa'),(174,'Reunion','re'),(175,'Romania','ro'),(176,'Russian Federation','ru'),(177,'Rwanda','rw'),(178,'Saudi Arabia','sa'),(179,'Solomon Islands','sb'),(180,'Seychelles','sc'),(181,'Sudan','sd'),(182,'Sweden','se'),(183,'Singapore','sg'),(184,'Saint Helena','sh'),(185,'Slovenia','si'),(186,'Svalbard and Jan Mayen','sj'),(187,'Slovakia','sk'),(188,'Sierra Leone','sl'),(189,'San Marino','sm'),(190,'Senegal','sn'),(191,'Somalia','so'),(192,'Suriname','sr'),(193,'Sao Tome and Principe','st'),(194,'El Salvador','sv'),(195,'Syria','sy'),(196,'Swaziland','sz'),(197,'Turks and Caicos Islands','tc'),(198,'Chad','td'),(199,'French Southern Territories','tf'),(200,'Togo','tg'),(201,'Thailand','th'),(202,'Tajikistan','tj'),(203,'Tokelau','tk'),(204,'Turkmenistan','tm'),(205,'Tunisia','tn'),(206,'Tonga','to'),(207,'Turkey','tr'),(208,'Trinidad and Tobago','tt'),(209,'Tuvalu','tv'),(210,'Taiwan','tw'),(211,'Tanzania','tz'),(212,'Ukraine','ua'),(213,'Uganda','ug'),(214,'Uruguay','uy'),(215,'Uzbekistan','uz'),(216,'Saint Vincent and the Grenadines','vc'),(217,'Venezuela','ve'),(218,'Virgin Islands (British)','vg'),(219,'Virgin Islands (U.S.)','vi'),(220,'Viet Nam','vn'),(221,'Vanuatu','vu'),(222,'Wallis and Futuna','wf'),(223,'Samoa','ws'),(224,'Yemen','ye'),(225,'Mayotte','yt'),(226,'South Africa','za'),(227,'Zambia','zm'),(228,'Zaire (former)','zr'),(229,'Zimbabwe','zw'),(230,'United States of America','us'), (231,'Europe','eu');
;

INSERT INTO artist(id, name, profile)
	VALUES (1, 'Brian Eno', 'Brian Eno is an electronic musician and producer. Also known for his multifaceted interests outside of music, especially technological. He was born 15 May 1948 in Woodbridge, Suffolk, UK. He attended Ipswich and Winchester Arts Schools where he studied with Tom Phillips, Roy Ascott, Christian Wolff, Anthony Benjamin, Noel Forster and George Brecht.')
  , (2, 'Gorillaz', 'Virtual band founded in 1998 by Damon Albarn from Blur, and comic-book artist Jamie Hewlett designing and drawing the band. It can be found in The Guiness Book of World Records under Most Successful Virtual Band. When the band were first created in 1998, the original concept was a group named ''Gorilla'', with a slightly different lineup.');

INSERT INTO genre(id, name)
	VALUES (1, 'Electronic')
  , (2, 'Classic')
  , (3, 'Rock');

INSERT INTO style(
	id, name, genre_id)
	VALUES (1, 'Experimental', 1)
  , (2, 'Ambient', 1)
  , (3, 'Alternative Rock', 3);

INSERT INTO release(id, title, format_details, catno, release_date, create_date, label_id, appuser_id, format_id, country_id)
	VALUES (1, 'Discreet Music', 'Clear Vinyl', 'ENOLP5', '11-16-2018', '05-01-2020', 1, 1, 1, 231)
  , (2, 'The Now Now', 'Red Vinyl Ltd Edition', '0190295643423', '07-29-2018', '05-01-2020', 2, 1, 1, 231);

INSERT INTO release_genre(release_id, genre_id)
	VALUES (1, 1)
  , (1, 2)
  , (2, 3);

INSERT INTO release_artist(release_id, artist_id)
	VALUES (1, 1)
  , (2, 2);

INSERT INTO song(title, position, length, release_id, artist_id)
	VALUES ('Discreet Music', 1, '00:31:35', 1, 1)
  , ('Fullness Of Wind', 2, '00:09:57', 1, 1)
  , ('French Catalogues', 3, '00:05:18', 1, 1)
  , ('Brutal Ardour', 4, '00:08:17', 1, 1)
  , ('Humility', 1, '00:03:17', 2, 2)
  , ('Tranz', 2, '00:02:42', 2, 2)
  , ('Hollywood', 3, '00:04:53', 2, 2)
	, ('Kansas', 4, '00:04:08', 2, 2)
  , ('Sorcererz', 5, '00:03:00', 2, 2)
  , ('Idaho', 6, '00:03:42', 2, 2)
  , ('Lake Zurich', 7, '00:04:12', 2, 2)
  , ('Magic City', 8, '00:03:59', 2, 2)
  , ('Fire Flies', 9, '00:03:53', 2, 2)
  , ('One Percent', 10, '00:02:21', 2, 2)
  , ('Souk Eye', 11, '00:04:34', 2, 2);
