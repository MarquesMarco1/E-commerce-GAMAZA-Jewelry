ec-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: localhost    Database: ecomm
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
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (6,'Necklaces','https://static.eproshopping.fr/media/f6a7b53d126a218bca2ba73a3305ef3060e4f58b/produit/3f91ae4f21de59af5f0239d16f93984d594db0c0.png','Un collier est un type de bijou ou de vêtement porté autour du cou.','2024-07-16 22:06:05'),(7,'Rings','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1O8p-NDXPcW_tAffab0CaRBiMIfKFKmjB3A&s','Une bague est un bijou qui se porte généralement au doigt en forme d\'anneau, plus ou moins large, serti ou non de pierres et quelquefois gravé.','2024-07-16 22:07:45'),(8,'Wedding Rings','https://png.pngtree.com/png-clipart/20210704/original/pngtree-beautiful-gold-wedding-rings-png-ring-png-image_6499014.jpg','Une alliance désigne, par métonymie, une bague de platine, d\'or ou d\'argent, symbole de l\'union contractée par le mariage de deux personnes (leur alliance).','2024-07-16 22:08:34'),(9,'Bracelets','https://e7.pngegg.com/pngimages/59/468/png-clipart-bangle-bracelet-product-design-silver-jewellery-silver-ring-bracelet-thumbnail.png','Un bracelet est un article de vêtement ou de joaillerie qui est porté autour du poignet.','2024-07-16 22:09:31'),(10,'Pendants','https://www.collier-coeur-doux.fr/wp-content/uploads/2024/02/pendentif-quartz-rose-coeur-quartz-rose-50cm.png','Un pendentif est un article de joaillerie qui se porte autour du cou ou au poignet.','2024-07-16 22:10:34'),(11,'Earrings','https://e7.pngegg.com/pngimages/738/417/png-clipart-earring-body-jewellery-silver-product-design-big-stud-earrings-for-men-gemstone-diamond.png','Une boucle d\'oreille est un bijou ornant le pavillon de l\'oreille, le plus souvent au niveau du lobe. ','2024-07-16 22:11:37');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
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
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20240715190943','2024-07-15 19:09:56',699),('DoctrineMigrations\\Version20240715192305','2024-07-15 19:23:13',157),('DoctrineMigrations\\Version20240716080355','2024-07-16 08:04:07',612),('DoctrineMigrations\\Version20240716081652','2024-07-16 08:17:10',511),('DoctrineMigrations\\Version20240723112735','2024-07-23 11:27:42',193);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'Or Jaune','https://img.freepik.com/photos-gratuite/vide-vide-texture-lumiere-piece_1258-175.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721174400&semt=ais_user'),(2,'Or Blanc','data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhMVFRUXFxcXGBcXFxgVGBUYFxgXGBYXGhoYHSggGBolGxgYITEhJSkrLi4uGB8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EAC4QAAECAwYFBQEBAAMAAAAAAAABAhEh8AMxQVFhcRKBkaGxE8HR4fEEFCJiov/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7Q1C7iIoSABCpkVoaoVBAATuUrQ4FQAU9BD29DUqCXpXQDDaIZ1Svc22jcaqJmtGIoGVyQEqa3JVVIzvaAhyghKvUBVApSogqCrpAEqk4gFfWQKr35AN4g2rlPYRHPMNiz71ADQ1U+hrV8+TOjh1k6ro/YGhFhrnWJHKmXv1ARY4Q8a1sFjvyhSgIeyWsF2rMW9sVlGrjQ92Cww0iu9XCXt0+MuV3YBNrCeHjdEXkIVJrJOl8faVXmtyZ1hXIS5I5+O3UBKtnLnjD6+CcMF51gNhXmtCQrQBcKqpFtbUlLLUCi0LIoFoQCFUpAPcoEgCKWigHAoqJFAKBXCSJaqAtRTkHqKcka7gZntr2EvbXI1PQRaJWcwMdqmZlelVUjfaNr4Mtq2E0rP5AxOrUTaL1NNo2vJmd0+AFv/Rbs4hWl0N8BXFgntWIFon3XsU13Ke95cUWE4fl/kp7OXbC5EW8AkdnK/8ABi1sIYtffIJm19wGhi9PMpjbO7T86mZr60qA9qzlWvWHUDS1UWSzXyNjviZmYd0qrhiOWpAGqphWswVXymNZl+foFaUBat1rEF1aY5w/Q1s12+CuGWPcBPJffP3KcsKvG8EZw+wXMqMtO4CY/EphQyCa2Ur8r11UiJD5AqADlGqii1QAVqRBblqBAPdIEgtVLAMJqC4kRwDOIiuFq6F4PGAbqqIEQVWqwB9SqvAt1ZCX6FucBH5AB1V0Mr7uS6ykaXKKe2O8wMFsxfMaq8zWiYLKOdczoOaZP6LPlzuAwWqLHlGU7sL5CEdC5N45ampzV31knXQp1iuWUJfuwCWunnrtd8YhtbdC7S5V1pRrbBb1RE3lDlHNPvAf6WSR3jdsi1MDLwxzlhDScr7tCmtld73T63TNjLFMPN/S8C0ZC+Ubr/z8AQ1IRRIx9sv0Y3BJTrEpbNV1TqDBUkl8Yoma47p8AMZgt1848t4fA1tpHKG8+WpmvlGHLVF8D7NM0j1S/wASAdr553BeK+gWLH4Gqyf4ACp1r2IrY1Adw8i1YBn4IX1oUrZd8jRw44ZfhXAldQMvDvX4W6kqpjFbWVewC1iBnc2ruYD00r9HLsvnMTar3qtgFOVY3w5oQJXVFE7EA9nEGPIpQQDR8ildn+C40mQDl+gGLaaFepCYl1polbCY1ADUjst/2UgVeJR2VYk4rgDV3aqQnEJetdoF8XfkAxVBVKgWnavkIBL2iHsw+q2N0AXWEc6n8Ac+0scdr8NayF/54wim2PdMDp+ksfCpfuAtnGKdcc1hK9KiBiZZawnKkjJNugxf50RYw8G300RIJBNkREQrhjemOV2wGV7IzWP5nG8RaWUKgsprjfBToWjMvj9FPbG+HLGvcDnWlmuOHaHnrgL4Jw9roQ306G700wW/SHjEWlncs8LrtF18gZW/zpP/AIwnlz2vgOs2715DbZw55YB2bMahUwKRKzu8QGo0lm2tBqJXUCm3l8NXdMAkCRYIALmYy6AOTGAce/uA590OmwC3JWd0NzK6dJWI98K87e4i0djUeQCbRY3rjJdFvEPfjtdjiHaZUpne2ucPkAVit0ETeBBbkRZrw8/woD3ioCqjlaLVAFOQW9Zj3IKVugCHXz+eQDky5j+HWQKJABNc5lrJZc8Y63jFbEFLPEAEb+RLawYjK/AoAC1PaI5qFMZy57VUmIgAoyNSr4C4Q0QkcgFObp1VE65EhXbYciV5AeAtW4AuToG5QVpAFqLc2klyGwBAS5tUoL2jVQGACeGHiREbWA2AKAUiVV4SOBcSOwBJWhTn6gKuWvtkKc7tK7EBnFd29xVpaYddsAHvWGsqzEPkme9V4Bq2mcfgQ98fwFzlnWID1vxu9oIAD35dd8ayMz7Tv+Q3Ce/bDrntDyZ3rGrtd4AMR2ca5EMyvdnAgH01wMBsAXIAlzQXIOUFUAzq3MHhHqgDkAVwVeVwjEKaAKoXwke5SI4A0LaoqMIY+30XGG+WIDXOhsRVhzFcXNaQF1phmvMByu5agquopXQ919p3gPtKqvcGOUHi7C+Or4AJaJOabXXAOVYgqovi7c+QLnJ7/IBxBgC612SFZgq8AnKU5Rccq+AI44YAMcpTn12FK6rgHPq4A3PFK78uBc/kLj9AW5+spwFq/Pl4KjG8W8CRlVfoD1qc6gHdDTv9AvbG7pdgBndKeddJIIc2Ef2PNNTUrc6yQS9FSpLPfZQMD7SZZoaxFnxf+Y94EA+nKCqlK79A4ugBKA5SK4XxgEqgqAr+ngDjTavIBOUWr8avF2lpy+sZClfvqvzC4B6P6e15SqlSEOtIaSjfd5iK9VNOq/EANLXLfGOl0IbX1zr1VWVIqXrP7Mj7ZMOqyn4rUH1pQjfL616IBsf/AEIskVI1ilTA9WGctbtdjF6sL1jzjW6A2lukJ8p9M9MwNvqplHC6K9kSYPqrj5RIbanPd/QjprnnjVIS0toTdNOa7wy2UDc621ltqnf5B9eNy7Jeuulxgdb5qkt55RREhEJLWc79Viu+ueYG91pGUZJK7n8Fo/PeUs9upgZbSz7rtDFMS3f0Rl8y7VLkGp1pV1/KugHqRmkeUZGdLSowTtPkUlplBaz+gNLrTtkU523T2M62lR5aC1tKneA91ol8faACO32F8ZSvS4A3KLe4HiuKQAmrdGplokdk5dCqjzGomQANbHsWjdKXyMs0LawBC2cUSMMvoQtn5hOMr8YVO43qyMau3iKdZ4pz0rqBzl/n36R9izZ6P/VCAeqS1jjrjPJNQHW3ys98L4fBzE/pzWGkUSdeRFr/AFJdFGrfGarqiQTMDqu/o5d+oK/0ot8Z3Jf2+Tkr/RlLSHzGHTQC0/oVJKqJjfdusb9dQOuttHtqv0Kd/ThGKYZrCvw5Tv6c3coZ8oQ1BtLfJUXOH0s02/A6K2+fuk6xBfa/MfpMN/o5n+lFld19ynf0YQhsniAG5/8ATBdb1W6k+hS/0xSapvG9eU0Q5tpbVCXiKdivWyrOaJtMDof6Y77Ikea+yA/6Y4rG6cp8sNE/Oej43LOrpXC3Wq/F/wAV4DoLbJjd18zFpazmq1pmY+Pl0CbbL7abgbEVL1jDWNd/sXWkVjvfdtPAzep9Q5k9SvnuA1bbdE07bFLabdp44zgZnLPn5/QHOhXhcPoDan9Ell3VYcsC/WlHmq/iGBrqUOIGxLWM17w5VqH6uS375a+TE52d/Qvjr5A2utN+pXqdahMzcaF8QD1eU54niKR4D0tKmGj6zMqqGjrpga7N49s+ffHr9GWzdgOY4DU1v3ogxrI8xVnPY2WSwndp7SABLKpgOs5pKdxs4Nq/QHtglLzn1A572zvbzakfBDc277QgHnrT+rCEkuy3jjjKeJSf0JU48sFuMMU2nfGuoNpaZ976XuBt9dccJzmvjVS/9Kql+eafS4YGJbW/ll1uu0BV4GxbWCXr7a1sVxLekE594pfV5lV6/iXFLa7gaX2qKkO2d3QWr44Iui/ckEutY3gOtAHrawknypTnxinnOvcTxdSJ2AZGsAkfVbi0JABqKEjhaKSIDUIrtrhSqVxgNqpgO0hUQOInEASplGr9yOrAGIUQDj5DRBSBIoDELRQEUtAGICVEJAI0JgISAPZXOJoav1VYGZijmL7/AABts1Ndm6M8Kgc5Hay+jVZWkANyOnS5FquimX1MdPjEiuurZAHenr4IKV6YoirsQDxjnRKCUECnaE4ilQigXEFVIUBIlRIpEQAkUNAEQYwA0QJEI0IASlDBcAEQFUNyC1AnESICkRQGo4JFFhoAxCwULAJAkUWWAyJcRaKWAxFDRTOihNeBpRwxHGdrhiKBqs31V45HZVeYkXIYjwNyWiZ1zDS1hV3cwpaDEtP2kA1tttizJ6rsFdDf6IBwVQpUGQBgAtUK4RvCSACVQnCO4QeEBaNIiDUQitAWjQ2loXAC0CQEgBFKSJIgAotyDVFuAUVANwIFtGNAQNoDELBQKIFlEJECKpUSlUFVAPiIjhSqUigaWPGI8ytcG1QNSPDR5mRwaOA0I+JFtBCKWjgHcRYnjUgCCEIBRCEAkCiEAosogEKIQCRJEsgERSolkAqIKkIAClFEAsNCEAJCFkAkSokIBSqCpCACpRCAEg1pCAGihoQgFopZCAQhCAf/2Q=='),(3,'Or Rose','data:image/jpeg;base64,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'),(4,'Platine','https://www.google.com/imgres?q=platine%20color%20background&imgurl=https%3A%2F%2Ft4.ftcdn.net%2Fjpg%2F01%2F34%2F21%2F31%2F360_F_134213180_vgs3IB9fq6f41PVKDSZYHnFRQEuIVjqG.jpg&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Ffr%2Fsearch%3Fk%3Dplatinum%2520background&docid=rE-HsIJtx6lvOM&tbnid=fbktRktQ8ArqpM&vet=12ahUKEwi8183ng7GHAxVdBfsDHQWoDvEQM3oECBgQAA..i&w=360&h=360&hcb=2&ved=2ahUKEwi8183ng7GHAxVdBfsDHQWoDvEQM3oECBgQAA'),(5,'Rodhium','data:image/jpeg;base64,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'),(6,'Palladium','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWxsbEiXrUeAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messenger_messages`
--

DROP TABLE IF EXISTS `messenger_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messenger_messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `body` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `headers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue_name` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `material_id` int NOT NULL,
  `stone_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` double NOT NULL,
  `price` double NOT NULL,
  `stock_qty` int NOT NULL,
  `last_updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_D34A04AD12469DE2` (`category_id`),
  KEY `IDX_D34A04ADE308AC6F` (`material_id`),
  KEY `IDX_D34A04AD1582D292` (`stone_id`),
  CONSTRAINT `FK_D34A04AD12469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FK_D34A04AD1582D292` FOREIGN KEY (`stone_id`) REFERENCES `stone` (`id`),
  CONSTRAINT `FK_D34A04ADE308AC6F` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,6,1,1,'Serti Griffes Oxydes De Zirconium Maille','Collier Plaque Or Jaune Chou Serti Griffes Oxydes De Zirconium Maille Forcat 40+4cm\n','https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dwb3c06eb4/images/FQCFJZW552-master.jpg?sw=1024&sh=1024','Or ','12 L x 12 l',2.5,69,999,'2024-07-18 22:05:35'),(2,7,6,3,'Bague Margaux Or Jaune Emeraude Et Diamant','Bague Or Jaune 375/1000 Emeraudes Et Diamants\n','https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw5fbb25bc/images/B3DFJEV293-master.jpg?sw=1024&sh=1024','Vert','55',1.92,335,999,'2024-07-18 21:34:12'),(3,6,1,7,'Collier Or Jaune Bragi Perle De Culture Oxyde De Zirconium','Collier Or Jaune 375/1000 Forme Cœur Pavage Oxydes De Zirconium Et Perle De Culture 5-5.5mm Maille Jaseron 40+2cm\n','https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw89f39928/images/B3CFJU2331-master.jpg?sw=1024&sh=1024','Nacre','42Lx42l',1.95,143,999,'2024-07-18 21:35:57'),(4,7,1,3,'Bague Or Jaune Cassie Emeraude Et Diamant','azertyuiop','https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw304bb9a1/images/B3DFJEV211-master.jpg?sw=1024&sh=1024','or','54',1.08,250,999,'2024-07-24 08:55:58'),(5,9,2,4,'Bracelet Identité Anilo Argent Blanc','AZERTYUIOP','https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw5374002e/images/FAIHBW0305-master.jpg?sw=1024&sh=1024','or','21Lx21l',10.8,69,999,'2024-07-24 08:57:23'),(6,11,1,9,'Boucles D\'oreilles Puces Or Jaune Clothilde','zertyuiop','https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw440a9840/images/B3OFJAJ002-master.jpg?sw=1024&sh=1024','Or ','10 L x 5 l',0.9,149,999,'2024-07-24 08:58:35');
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
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
-- Table structure for table `stats_cart`
--

DROP TABLE IF EXISTS `stats_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stats_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `count` int NOT NULL,
  `last_updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_4ACFE0F71AD5CDBF` (`cart_id`),
  CONSTRAINT `FK_4ACFE0F71AD5CDBF` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats_cart`
--

LOCK TABLES `stats_cart` WRITE;
/*!40000 ALTER TABLE `stats_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `stats_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats_product`
--

DROP TABLE IF EXISTS `stats_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stats_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `count` int NOT NULL,
  `last_update` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_4AF045F04584665A` (`product_id`),
  CONSTRAINT `FK_4AF045F04584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats_product`
--

LOCK TABLES `stats_product` WRITE;
/*!40000 ALTER TABLE `stats_product` DISABLE KEYS */;
INSERT INTO `stats_product` VALUES (1,2,2,'2024-07-23 18:42:53'),(3,1,2,'2024-07-23 18:45:38'),(5,3,3,'2024-07-23 18:51:35'),(7,4,1,'2024-07-24 08:58:52'),(9,5,1,'2024-07-24 08:58:57'),(11,6,1,'2024-07-24 08:59:04');
/*!40000 ALTER TABLE `stats_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stone`
--

DROP TABLE IF EXISTS `stone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stone` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stone`
--

LOCK TABLES `stone` WRITE;
/*!40000 ALTER TABLE `stone` DISABLE KEYS */;
INSERT INTO `stone` VALUES (1,'rubis','https://planetys.com/magazine/wp-content/uploads/2022/08/rubis-charbon.jpg'),(2,'saphir','https://www.google.com/imgres?q=saphir&imgurl=https%3A%2F%2Fwww.celinni.com%2Fimg%2Fcms%2FBlog%2FSaphir%2520cachemire%2FSaphir-bleu.jpg&imgrefurl=https%3A%2F%2Fwww.celinni.com%2Ffr%2Fblog%2Fle-saphir-du-cachemire-l-eclat-veloute-d-une-gemme-legendaire-n168&docid=a_UjdLK59bQOjM&tbnid=1Sei0vW-wvlBsM&vet=12ahUKEwjKhu73hLGHAxUpVqQEHQhmB3AQM3oECBsQAA..i&w=1024&h=573&hcb=2&ved=2ahUKEwjKhu73hLGHAxUpVqQEHQhmB3AQM3oECBsQAA'),(3,'émeraude','data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExIVFRUVFRUVFRUWFRUWFxUVFRUXFxUWFhYYHSggGB0lHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGjAlICYvLSstLS0rLi8tLi0uNy4vLS0tLTUvLi4tLS0wNy0tLi0uLy0vLS0tLS0tLS4tLSsvMP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAADAQADAQAAAAAAAAAAAAAAAQIDBAUGB//EAEIQAAEDAgQEBAQEAgcHBQAAAAEAAhEDIRIxQVEEBWFxBoGRoRMiMrHB0fDxQuEHFFJicoKyFTRDksLS8hYjM1Oi/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECBQMEBv/EAC8RAQACAgADBgMIAwAAAAAAAAABAgMRBCExBRIiQVGRE4GxFDJCYXHR8PHB0uH/2gAMAwEAAhEDEQA/APi5ClauCzKCUQhNAkwUoRCBoQhAJoQgEgnKEAgIQgZKSESgEwkE5QIhEKihpQOnZVWepcFJCAAWmFJoVFyCSUMCQCrGg0smHhYOlNqDZlQrXCSsacLQVUDwwg14Wb3EqWtQX8dI1VDlKDT4hQsk0GZKlNMBAklcJEIEhCAgITAQUwgUKSrRCCAE1agoBCYThBKSopgIIVBMhNoQJAVQlCBFMBU1srYtgIMZSSLpSQMlJoSKphQOUYUnOQHIEHK2qAbrUFBQTYpJQ0wgZbdN0KHSUkEymtPgIQcZMFJCBkohJCAQhU0IEEFUQpQNqpQCqQJxSCcJFqClJKGlCAATKtjScgtDwjzkx3om0TaI6ywKbQtm8M7+yfRTVYW5iERFqzy2lACTFqHBFjYIUV3ypqVFk0oAphDymwIBqlXKHBAgqLVAWrnSEEwEyZyU4Vqx4QSxq0wSpcqpvQaNEBZYbrVvVQGoDGmrbSlJBwEBXhUlA4RCJThAgmgIKCguVw3LX1BLY/NXyrgDVMmzBmdzsF62hRLRIZhbkDlMbbqJZ/F8b8Lw16vNM8NV8OIsfh3wmPVas8OvImWjvUpt+5len/rtPG1znY3DJrmzTAi84rLv+VcdxXEYhwnD8O5rIkhsBpOQPzASqxO51tmX7R4v8Nf8PCUPCT3ZOpns5z/9DStH+FsH/wAjnDqKVY/doX0qjyrnL/8A6Kc/4be5WXE+EuZun4nFsA1Df/AK819HL7Xxk87TER8/9Xz6h4Tcbtp1HDQlgaP/ANOWw8N1mAONKGzFyyy9xR8CcQ/6+PfEZDF/3BZu/o/YcePiKriMoAGK/WVSYlH2vLaed49p/eHhX8N8MyMMg7grl/7Qwth8k9CBC9LS8E8O0/M6oe7gPsFyG+FOE1pydcT3GfdR3HaaVv15vAfGx1CWNDWnIFwJ9Vpx9FjgGuz3Gi9/S8P8G3KjTnqJPuuDz3wiyp89HDSqbf8ADf3A+k9Qndl6vgzMxas6fNeY8sNPK43XXAL073OYS14hzXFjhM3Biy4XGcG112iD91MS9OHipjw5Pd02FQ5OpYwpV2gYapVtTxAIIcIQ1yo3UgIFqrcIUjNaZoEwpht0nLVrbSg5GAYVnTYlTdIWopWQcimxpOay4ktauOHxZYvaYug7BnHNjJJdUhBoSs1TihAgtFEK2hBMLkcDwZquwiwzcdgsyF2fIrlzdx9v0Ulx4i80xzaHd8HgY+mxrQ4BwIabg9916ziOCNUipXe1jcwMQ+n8+i8BxNVzCcJIOUjZdryaqX0hJJIJBJ7z+KivNgZeDtl1eLa/PrPNw+dOZU4j4bHsDcYptEuMSYLnEgSdTHZfU+RcY3g6LaNFnytzJN3uP1Pd1PtkvjnPuHLaziNQHA+33bK+ocFW+LSp1MsbGu/5gCUhqY+GxzSKzziHpX+MKl8NNo8yVx+L8R8Q5oktE7DTZdI5qm5spdZ4THPl9XKqc1rH+MjssRxLzfG71UBJzkdK4cdfu1j2W6sdTK14YA5mFxVtwzoOyLWrEV5JIgrl06xHVYEL0FDlVM0Q8vgwY2JRW94iI2+SeMOXVG8WXCzK7mQdA8gA+4nzXXcO4yQRcEg+Ruvf+K6jRRxOAJEtE5A5g97Ly3E81Y2piYwQ5gJGzyPmTuxpl58l5vNO7+n8/nR4zmLIeepWYbZdlzlrSQ5ogFdbKiGvgt3scSRShNq0cIUuqMJhTEKy8kI0ugiJCuk6Ew2yqgwEwgmoFpQZOaK7YKza8k2QcgvDbBKlUvdTggyVFQyUBUN7KXumybn6BSxl0ElCl+aEFuapTRCACoKQkSg0JXJ5XVw1AVwpVUnQ4d0UyV71Zh6WrRkHqn4edhL29iPKQfuFyeCcHNuRIHsuu4aphrwMnEgeeXvCivVj4rT4q+jXxKz6Hd2/iPsV7DwRxGPhGjWm5zPKcQ9nx5LyvNhipOGoh3ob+xK7L+jd5L6tIGZY2oB1acLo6/O30VvN68V4isTMvZOCxK5JZdY1GQVD2RMJaoe1clkReyotEWRWb6lw5W1AibobTMrWlTQveNNKLi0yPdcmlWIgOEjaYF1xmhcqlGqPPafNwfGPCsfw9T4ejQ++7bu9pXgeH+C8gOGAQB2dqV9NADpByIIPY2K+etw03VKVSmHEWxRkRayierw8XuIiY26nxJy0U6TXNcHA3tovMEr2Nfhm1GgNtLY8wF5EC5B0JHokPZ2deZpNZncwzYJWgI1SA2SLbKWgUp/DJSYYWlNyBmcMKcUK3uIsEn8ORmgkkvTbTIKb6oAwjPdZkE6oLqPusZQblUGoLaAEnFNrpWb23lBYahaU22QgwQgZpygGtScE5SJQNCQKUoPR8A4/DBAkor08MPzIIPoUcgeDTIPUDaQJ/wCoLt+V8G97ZqFpEZAGYyjbRUmdMLLeMd7TPlKeO4bX+Fw+4S8KNdw/F0jcB7sE7h4LQP8AmLfRejp05osplsgDBMm4Bi4jMQFx+MpsoMhxlwjANZaRB6AZz0UTd4MXGT9zW/L5Pb1KJIvc7rreJpwbrneHfEFDim4foqgSaTs7G5b/AGh19QFzeK4UOOHM+6u92Hiu5OrPPYFm18Zruxy28X/XZNvL6Y+oC25j8U29M9oYo6upG4XK4OlIS47+rUz/AL1Qb0dVYI9XLr6fiHhWn/eGEbjE6/8AkBRE5oyV8LtK1MC40ICsssD1XTV/GPCtBGJ7uzDf1hR/60oubLaVRwBNzgbMbQTZNwr8TUc3fvpgOIGmi87zLmXDVKlSkYc5piZDb5kAnO8iyw4/xeapIZTDC4Rjx4iNLAAXXjqfDkn5nHP07KJl5eJinEViJnWue/zem5py5ssdTaWgNOIWsQenRfPOb0cNZ8ZEyPO6+h8j50GfLW+YPJBqHMdX/wBrS+YXjfF3CfCq2uDIB3E2SqOyb3pmnFf05T6/06WVIclmrpqz6MMaJVPM2iE5DRuVhjnzQW14A6oNVxRSa3+IqalSbDLRA8IzlQ0ygtwi+ZTp7IJhC0AwzMSVm26BudBsqY0u7C6dIAZgH8FNh1lAjVchWGnqhAiVKs05v7JE2iECcENKbmRnmpagAmQkXQj4iDuvC7cbn05iQHNMxBBifcCOq9bypri408LWvAGYm2IAlt9YXiOQcTh4imRaTh9cveF73jK+EkUYBAgvFyLXa0nPv+K52YHacTGXXrHs5fHcwFNppNEuBm+TT23sDHVef+G6o57ycTx8xxH6vPTyWvLKXxJEG2u8zrvZdnQ4F9AzUBhwgmxLQZtGv62VJZ9Ypg3WJ8X1dYzgzWk0nYXtGMfNheyDmCNtx01MLk8x53xmEYuJqi2bXBsxbNombFc7mHLqfwfjCCcQDXNsfmOQjpM9oXS1eXPcMjeSI6aKImYdcWatuczy35w6qpzCu+cXE1XbYqzzI0/iXUcUxs4nEON7OMnpdego8icZ+W3eMxnJUv5AA0ipxFBm3/uMkW1vKtEtKvEY6z19v+PPcKYGgymBcx3812NC56GDHurPL6bMuJp1dIZiMDuAR7rTh+GFszBB9FaXTLlrbnH001rMluUZrsWcGBSYJ+aLge8rXh+AFQGDAxASRlM3jy9l2nKuAAFQOcSGj5jEZkRIvYqIjfRkZuIiI69JdOGXEZZdVtX4PMzfUaqa7TjkWHSc91qyu4gk3iJ7ZfdTpWZtymHGokQZ0BDepldV4geMDWOMuxS0bDXyXZcRxLabC52mQ3OkLyfE8a57y45m3YbBTDR4DDN8nf8AKPqQqAS2AsKj5sMksOclMg2yhXbiSyLFUSIsLp1ACdVLXEZGyB1CDEgpU3gHJWNyPVBEmGjzQDxN9eqTiVL2uLouhgg3QS/Pda0nQIGZzKTnRJAzsJQ1joBNhn+26DJzc05yCsvgWFzcHopNJ1ibTMT0QatLunshcfE3XPskg3MCb/gFER3WziLExnuT9m5odSlxkERlIufwCDjGdUiuQ6mYHfLbusntMZEfq90GRSlWWHz2zScEBSqlpBBgggjoQZBXqeR82DyGGGuOhMA/4Tp29F5MptKiYcc2CuWupfUuV1WfFa1sFokFxsA43Do089F3lesS/P8AHICRbqV8u5VzstIDzkID8yOjx/GPfuvcco48VC0ZOcLXlrh/cOoztpCpMPl+O4G+O3enppPP68YGMtPzkQRf6RO38QXF4OjUqWlxtH1Ez2C5fMaGOuTpZoOgDRc+pJXouWv4bh2Q6rSbuS5o95sorTc6ea+b4WGIrG5eeq+FoILgROdgY7Xv/NdhwHg2gZxX+W0yBPabldtzTxPwhFuIp6DMu0AP0zPkuLwPi/hg6MRc7T5Hxf8AxABWjHHe1txvm460eGLa/SWFbwpw+CG0TTfN3Ay3rIXWcX4Zq0vmDXFuGZAsRG5XY838b0WEgMdPU0w3/Uut4n+k8uYaQa0Uywtg1Jg2hwAapmlY83bhacffnaJmPl++3O5MxhGkFtwT/ENB91I4d0mTZ0T+h5LyPDeKqdOQC3MuBDXkzsOn5JV/G5ItOUCGNAHqSqxEu89m8TN5msdfV3HGANfAMxkVjVljHOJAaRe/94H8F5qr4nJ/gk7kgH2C4PGc4fVaWZAxPzOJtpJOStpoYuzsvKLfNpzzmfxXw2zG5Dc6krryREzfZJtPQAnaLrWlT0w31xHDCmG7jx1x1itekJNWx1lMAwDGZ3T+GJuW5aE57ZKDkNLm11K6iJJGmfomyIkx0H4piGkE4TbITt90NcWkTnOQg+qBYd8zp3yKthDQTN9o0SaTdxM6C0yd7ZQFm1si5w9SemQQa/FMTJ6H7QopgHEXSdhI3vKukDFgSADcG0alwSHDnN1gNo0E2QQXB1oAjK5TcNyQBbcgdApDx9RGRAgRHmfxQSSMRAubddba7eqCcV7aRnsngm4OZzOUKqoiATYwTY22EbqXmXb2EEm0G42QQW9EK4foLf4f5IQcqg8TdwixxSZ/XTp5oqUyS44pJnS0d/8ALYdFpDXRP4E9JJ8siE3VBiu02aegkD5UGLqQiJv5CbdYjL3UPptALWuMmNCARqTGUQFpWqNkWInOxntpufVIxMNEWl0kx0geh/JBk9knMaCCYmOsfzQKdzYCBeAT1zg6dd1q98QGmBliFpJ9TKHNaCBE5SDABH3QcZ9Akw0Ez2/NQeGd+umlly3G2Qjo0EdYc7JMlkj6R8pOU6dDYoOAGlc7lvM30ZAhzTm10xOhGx6hXTcHSZJiIkzE7iNuqshn1XMW0A9yZP60RW9ItGpgVee1Doz0cT6lyx/2xWAgPAG2Bn5StBTbcunIQAGumc7jLXRApNJiCd7XOg6KNOcYMcfhhxKnHVHZvPSCR9li55OZJ7kldg1oBBDJM5C5z2AQ9t3fLN8zAmd4j2MqXSKxHR1wadvKFoeHfq0juIz6Fc/ALaSM/wB9umf3wEXALc9BvGpP5onTD+qmYkTsJJ9gh3DQYcYMxf8AXVc+CHS4QQBZpMiesxlvsgVYiLFuUgHec3ddPaUHDbwzdzlbK5WraIDS5zYvaXdsgrNSIM3kzDWjrMaC5EJYcNyQJkgQZtOaJSXAxhMbgOMEaD5RndREmGkN6l3fMraSf+JoIJ+rphEdxnqkSIAbcAZ/K28GR176XzQYtkuwgOJGkdINiDGSoAzoBuHC9xqJmOmysAQRiAFgYkgk6C98uv5Zxh28/WYi/wCggnDMuwkwJm52vO91oKWKJwtBuSSGyCLZ3m+iT6gLQ0EmSJ+UHrkI9OiTmgzbM5unzAANv1dAGnAkvOv0zpECSR+t1LDPzYfMzNttFq57CYtr9IIGW29tVm6q5wBMwLCxAgDeb6oKkyCbHMAFpN4i0zHRLAL4jvAtYTqJH3SNQ3E2zIF79Znok14aJbnnJAt7kGyC3Bwg4obpGEkgTH23lU4FxLonrIHqMwoNW+IyTlcySesDNSKloIEk5Q23eRM9ygt9vqIJ2E/L79PfNN7nG7YaTc4bQNL5tFjqowETJEkX+mL7kqajjf5i6+0z1koLHdh6lzfxSTaWgZeuGfOUINXM1EwMr6rQkEXE3zIMx3WLXW6qfidSgA399f2Q4HO98hn5p44KC45+iBg5STi080mCSZdfLUnqpeSCD6Jkg5+yCg3QxAuN/wBk3ExPcTl2Clg7jorafVBTRJAmd5JhQHHe3nA7AqBcq2luUSgKr5EZjrA/dV8TPXpt+uiIGguoeIlA/iTIN8oBJj91UBueegm4tn9lk0fmho1KDSk4XNxbUiZ6Zaop1HEG5sDMkn0GihgJM7apE53zQU0htsQjsT7wE2PwxAj+9Jn+Xksj3VCpaABO8IKFWZuRncZ30nrO+qhz7zYne9vsmRIzvtCmT+yChiJJIE53AMybCSlAsCYE5AF21tJ9Ugbz7BFKkbHI+iCcQFhMzmDFsrj8tyhp9Tpf0zTcA20z2Tac4gCPMoKa7Dc2MzYkHpIELJsTvtaT+vNAdsB53TY50zcdtEDNONBY5EgnucvRDCMJyJ/zWGUZwsyJNyc89VbnZ/jmgkHKGgZaKzMfLAva1ye+qjGJmO3RFR0nOT6INH1zYDEI1m/2EapB3VwzGYJM59lAidVo+8Rp0QRhz6RfoniEkwSTleAPLVKd0mi3U/ZBJe3U+yFQcUILLlWJCEGpfbDA7qTdCEDLJUxBQhBONWhCAt5oY6NEIQUE3u9EIQTKRyzQhBJamBZCECbKdR+nqhCCAVTpjZJCCfw1U9MyU0INKlAtus8YNoQhArDS6RccyhCBCZkBU71QhAOAQ4t0F95QhAgdAPNWRuUIQINk2Sed0IQWAUIQg//Z'),(4,'diamant','data:image/jpeg;base64,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'),(5,'améthyste','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.poincon22.com%2Famethyste&psig=AOvVaw2nVVtkIYSId1dPSEwhYc1S&ust=1721407715448000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCcns6FsYcDFQAAAAAdAAAAABAE'),(6,'jade','https://df2sm3urulav.cloudfront.net/tenants/gr/uploads/images/1555000-1559999/1555390/61124acf39bb1.jpg'),(7,'perle d\'eau douce','https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTWmJKHUS3W9yhAjaLjv2eV4FNfdrZ12OA6pNf6eskICjFEbzHaU25eP1zB4iN6FoDDk8opTKbVTU7YUnsGAq5cBcfB0XTH-x9EzIu0b7J69QyBV9ocb48EwI1OmGGnu3ew7zhWNWjrqA&usqp=CAc'),(8,'perle de Tahiti','https://www.boutiqueperlenoire.com/cdn/shop/files/pendentif-perle-de-tahiti-10k-white-gold-china-11-12mm-48886362931544_1800x1800.jpg?v=1682437147'),(9,'grenat','data:image/jpeg;base64,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');
/*!40000 ALTER TABLE `stone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(180) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip_code` int DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'alice@gmail.com','[]','$2y$13$dY3e8fYyy9o6pZhzGpRnA.V65nILywEB98J/YIWuQ.JYSS6DOGe7S',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'guillaume@gmail.com','[\"ROLE_ADMIN\"]','$2y$13$/BAKmsT35CmbSjH.6RgKW.Ye3ccLf3dYJS5Lx2QT0qYXx.p/OETYa',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'aymeric@gmail.com','[]','$2y$13$DotBeU.mbRX9L8HEzc2zpeKOTjGgvpLNuBvuuqO3CmA5iy4Tf3KlS',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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

-- Dump completed on 2024-07-24 11:00:47
