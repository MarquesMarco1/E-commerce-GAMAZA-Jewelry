-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_BA388B7A76ED395` (`user_id`),
  CONSTRAINT `FK_BA388B7A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `item_qty` int NOT NULL,
  `last_updated` datetime NOT NULL,
  `cart_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_F0FE25274584665A` (`product_id`),
  KEY `IDX_F0FE25271AD5CDBF` (`cart_id`),
  CONSTRAINT `FK_F0FE25271AD5CDBF` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `FK_F0FE25274584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (6,'Collier','https://static.eproshopping.fr/media/f6a7b53d126a218bca2ba73a3305ef3060e4f58b/produit/3f91ae4f21de59af5f0239d16f93984d594db0c0.png','Un collier est un type de bijou ou de vêtement porté autour du cou.','2024-07-16 22:06:05'),(7,'Bague','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1O8p-NDXPcW_tAffab0CaRBiMIfKFKmjB3A&s','Une bague est un bijou qui se porte généralement au doigt en forme d\'anneau, plus ou moins large, serti ou non de pierres et quelquefois gravé.','2024-07-16 22:07:45'),(8,'Alliance','https://png.pngtree.com/png-clipart/20210704/original/pngtree-beautiful-gold-wedding-rings-png-ring-png-image_6499014.jpg','Une alliance désigne, par métonymie, une bague de platine, d\'or ou d\'argent, symbole de l\'union contractée par le mariage de deux personnes (leur alliance).','2024-07-16 22:08:34'),(9,'Bracelet','https://e7.pngegg.com/pngimages/59/468/png-clipart-bangle-bracelet-product-design-silver-jewellery-silver-ring-bracelet-thumbnail.png','Un bracelet est un article de vêtement ou de joaillerie qui est porté autour du poignet.','2024-07-16 22:09:31'),(10,'Pendentif','https://www.collier-coeur-doux.fr/wp-content/uploads/2024/02/pendentif-quartz-rose-coeur-quartz-rose-50cm.png','Un pendentif est un article de joaillerie qui se porte autour du cou ou au poignet.','2024-07-16 22:10:34'),(11,'Boucles d’Oreille','https://e7.pngegg.com/pngimages/738/417/png-clipart-earring-body-jewellery-silver-product-design-big-stud-earrings-for-men-gemstone-diamond.png','Une boucle d\'oreille est un bijou ornant le pavillon de l\'oreille, le plus souvent au niveau du lobe. ','2024-07-16 22:11:37'),(12,'Gourmettes','data:image/jpeg;base64,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','La gourmette, ou bracelet d\'identité, est un bijou célèbre pour sa variété de modèles et de matières. ','2024-07-16 22:20:02');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20240715190943','2024-07-15 19:09:56',699),('DoctrineMigrations\\Version20240715192305','2024-07-15 19:23:13',157),('DoctrineMigrations\\Version20240716080355','2024-07-16 08:04:07',612),('DoctrineMigrations\\Version20240716081652','2024-07-16 08:17:10',511);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messenger_messages`
--

DROP TABLE IF EXISTS `messenger_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messenger_messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `headers` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue_name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  KEY `IDX_75EA56E016BA31DB` (`delivered_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messenger_messages`
--

LOCK TABLES `messenger_messages` WRITE;
/*!40000 ALTER TABLE `messenger_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messenger_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` double NOT NULL,
  `price` double NOT NULL,
  `stock_qty` int NOT NULL,
  `last_updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_D34A04AD12469DE2` (`category_id`),
  CONSTRAINT `FK_D34A04AD12469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,6,'Collier Plaqué Or Sadoth Oxydes De Zirconium','Collier Plaque Or Jaune Chou Serti Griffes Oxydes De Zirconium Maille Forcat 40+4cm','https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw4e9266ba/images/FQCFJZW552-model1.jpg?sw=1024&sh=1024','or','12Lx12l',2.5,69,999,'2024-07-16 23:48:40');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `publication` datetime NOT NULL,
  `stars` int NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_794381C6A76ED395` (`user_id`),
  KEY `IDX_794381C64584665A` (`product_id`),
  CONSTRAINT `FK_794381C64584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_794381C6A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adress` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip_code` int DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-17  5:47:25
