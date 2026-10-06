-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: sweetstore
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` char(36) NOT NULL,
  `registered_user_id` char(36) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `phone_number` varchar(64) NOT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `registered_user_id` (`registered_user_id`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`registered_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('0ed8624d-b0cf-427f-9c31-8850876bd145','373d30b2-b3ff-4240-bb0f-590213165b5c','test','08377852447');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_address`
--

DROP TABLE IF EXISTS `customer_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_address` (
  `customer_address_id` char(36) NOT NULL,
  `customer_id` char(36) NOT NULL,
  `address_line_1` varchar(255) NOT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(127) NOT NULL,
  `zip_code` varchar(64) NOT NULL,
  `country` varchar(64) NOT NULL,
  PRIMARY KEY (`customer_address_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `customer_address_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_address`
--

LOCK TABLES `customer_address` WRITE;
/*!40000 ALTER TABLE `customer_address` DISABLE KEYS */;
INSERT INTO `customer_address` VALUES ('c72fd121-ab71-4b29-96d3-1f59c00e8a4f','0ed8624d-b0cf-427f-9c31-8850876bd145','Noida Sec82','ghf','Noida','201309','India');
/*!40000 ALTER TABLE `customer_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_partner`
--

DROP TABLE IF EXISTS `delivery_partner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_partner` (
  `delivery_partner_id` varchar(255) NOT NULL,
  `registered_user_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `approval_status` varchar(50) DEFAULT 'pending',
  PRIMARY KEY (`delivery_partner_id`),
  KEY `registered_user_id` (`registered_user_id`),
  CONSTRAINT `delivery_partner_ibfk_1` FOREIGN KEY (`registered_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_partner`
--

LOCK TABLES `delivery_partner` WRITE;
/*!40000 ALTER TABLE `delivery_partner` DISABLE KEYS */;
INSERT INTO `delivery_partner` VALUES ('59754962-f321-4f8e-b16d-c3f4ebd09380','6eed47be-b0ed-4268-ba3b-4f53395fd8b5','Rahul Delivery','9876543210','approved'),('e37a23a3-d767-4dd9-9179-e8cb441d7f82','719cfce9-5355-4504-b2fa-a3b7e67302f5','test1','5674562341','approved');
/*!40000 ALTER TABLE `delivery_partner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` char(36) NOT NULL,
  `order_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  `seller_id` char(36) NOT NULL,
  `quantity` int NOT NULL,
  `item_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) GENERATED ALWAYS AS ((`quantity` * `item_price`)) STORED,
  `delivery_status` enum('Pending','Assigned','Picked Up','Out for Delivery','Shipped','Delivered','Canceled','Failed Delivery') NOT NULL,
  `delivery_date` timestamp NULL DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `delivery_partner_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  KEY `seller_id` (`seller_id`),
  KEY `fk_order_items_delivery_partner` (`delivery_partner_id`),
  CONSTRAINT `fk_order_items_delivery_partner` FOREIGN KEY (`delivery_partner_id`) REFERENCES `delivery_partner` (`delivery_partner_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_items_ibfk_3` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` (`order_item_id`, `order_id`, `product_id`, `seller_id`, `quantity`, `item_price`, `delivery_status`, `delivery_date`, `product_name`, `delivery_partner_id`) VALUES ('01a108c9-3147-43f0-aa06-dfd40bc1eefc','fc227d5b-88c5-4a3f-a71e-7cb257abe6fd','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',1,299.00,'Pending',NULL,NULL,NULL),('023b4b0b-c143-4de0-b212-274c8a80d3f8','a9d17bff-003d-480a-b94b-80ae0d27c7c8','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',3,500.00,'Pending',NULL,'Kaju Katli',NULL),('0264c5b8-9550-4ef6-b210-6df568aa607a','e1b4f95e-a548-4e6c-8471-9b06a57f204a','250d7666-1c1b-42ae-b7ff-0e3e1936daaf','fea2f687-df3a-477c-8371-f0596ae108ec',1,569.00,'Delivered','2026-09-25 11:46:27',NULL,NULL),('044a25d7-42ad-4dfa-9b00-6e2d4077ba9c','c7c11792-06d9-4ee6-bc8a-3189d9851d60','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,NULL,NULL),('0dd599db-013a-4cf0-a362-b2fc5fa63c73','2e98beda-21c7-4972-a7ed-e046c74b7aa3','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',3,500.00,'Pending',NULL,'Kaju Katli',NULL),('0fae82d2-7407-4bbb-b9bc-d086ea83f913','c91588f1-264a-4af0-ba68-66085819760f','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',4,500.00,'Pending',NULL,'Kaju Katli',NULL),('13a93ec2-bb78-4230-8ea0-4f7c2aac5d4f','6cfbd7aa-4242-4618-92d9-7faec4f759b6','250d7666-1c1b-42ae-b7ff-0e3e1936daaf','fea2f687-df3a-477c-8371-f0596ae108ec',1,569.00,'Pending',NULL,NULL,NULL),('19e37b8b-9ae2-4405-be3c-e701cb93ea97','84ded4bc-f066-4825-85ba-d94f4b4561b7','77a00356-f449-4ecf-ab55-b58834eb88fd','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',1,199.00,'Pending',NULL,'Khakra',NULL),('1cdef051-efd6-4636-abeb-bdf2ad640cbb','a0a46f7b-4dc1-4964-9a2e-ea277444a100','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,'Kaju Katli',NULL),('21c4de7e-a2ab-4a59-8018-7e3679262c33','8371958b-5317-4270-bd47-fd6b59023ffc','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,NULL,NULL),('2261a2b3-4103-47ea-b268-64e1a96484a8','a0a46f7b-4dc1-4964-9a2e-ea277444a100','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',3,299.00,'Pending',NULL,'Kachori',NULL),('2ad7143e-36c1-4cd5-a31c-75961276e8d4','190e27ba-7793-4eb6-be72-751d04b17a1c','0c843f04-6032-40b1-80f6-57450744f52f','6771d2b8-fa4e-402c-9af5-70d8bd5f21fa',1,499.00,'Pending',NULL,NULL,NULL),('2b55b2b9-5321-423f-89d3-c31822c0c688','a5db77e7-ae97-4849-8759-f2025860026e','0c843f04-6032-40b1-80f6-57450744f52f','6771d2b8-fa4e-402c-9af5-70d8bd5f21fa',1,499.00,'Pending',NULL,NULL,NULL),('2c69b7db-99ec-48f1-b8d9-e7cfa1583e52','1151bceb-9d92-4965-b982-cd3a9b8b5b1f','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,NULL,NULL),('3332a9bb-aacc-4f7a-8a31-db7eca5b3e60','a9d17bff-003d-480a-b94b-80ae0d27c7c8','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',3,299.00,'Pending',NULL,'Kachori',NULL),('37dd0f1e-3e65-4584-a852-5703a814daf9','4e178ad0-c7cb-4886-a886-253381cbf660','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',2,500.00,'Pending',NULL,NULL,NULL),('3c1ff69c-dfbe-404a-baf6-f0a632cd9fbe','f8e1918a-6529-4a19-bc8b-11620af09b47','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',3,299.00,'Pending',NULL,NULL,NULL),('414746b7-13a5-4982-a8d3-f60b1a254367','2e98beda-21c7-4972-a7ed-e046c74b7aa3','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',3,299.00,'Pending',NULL,'Kachori',NULL),('42b8d517-16ff-4850-8a29-f5c6a10689ee','cc9960c6-bfdd-432b-b684-47bc85e90bd9','9733b208-5892-43c5-b56a-f7573b44622b','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',1,359.00,'Pending',NULL,NULL,NULL),('4b79c158-4b95-4875-9223-9d95986239aa','c1e23611-ca0b-4b4d-b818-d918eeb91bde','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',1,299.00,'Pending',NULL,NULL,NULL),('4b8da3ba-8b55-4762-8427-f0ce4d26c4bb','3bfb69f4-070e-4537-88e4-bbac71279a6b','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',3,299.00,'Pending',NULL,'Kachori',NULL),('4da9287d-1c91-49f3-ab52-d91ae6af213b','6e47345a-3cc3-4433-84b2-1766d0ad9af4','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',3,500.00,'Pending',NULL,NULL,NULL),('4fcdfc7d-c188-4fcf-9e82-ff8c83ccbfbf','cc9960c6-bfdd-432b-b684-47bc85e90bd9','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,NULL,NULL),('55d143ff-bb7d-414c-b610-d3e7d63eea26','d6c43eef-8fc8-443e-823d-ccd959b840a1','250d7666-1c1b-42ae-b7ff-0e3e1936daaf','fea2f687-df3a-477c-8371-f0596ae108ec',1,569.00,'Pending',NULL,NULL,NULL),('55f07cf0-5c7b-474c-9ac5-2b7fd3c9ffe1','1c8ee471-62a8-4285-8a58-48a2a08142af','250d7666-1c1b-42ae-b7ff-0e3e1936daaf','fea2f687-df3a-477c-8371-f0596ae108ec',1,569.00,'Pending',NULL,NULL,NULL),('5c775d44-d8a8-4ff9-a887-2a40bdc9bc59','2868c043-546c-4b43-82d1-44499477ab98','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,NULL,NULL),('5e34c28c-55ed-46e1-9acf-c345a9ca8bbb','84ded4bc-f066-4825-85ba-d94f4b4561b7','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',4,500.00,'Pending',NULL,'Kaju Katli',NULL),('5e8267bc-0844-472f-adaa-4d7421efab50','c91588f1-264a-4af0-ba68-66085819760f','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',3,299.00,'Pending',NULL,'Kachori',NULL),('66de9ca6-1227-47a7-b996-64690ebdf4e2','7eb89d75-b3aa-4b2d-b39e-124b29fefbe6','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',1,299.00,'Pending',NULL,NULL,NULL),('6d4647bb-00dc-413c-8695-b74b69fc5bed','1e5425d8-ea8f-432e-9d2d-122db45086ac','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',1,299.00,'Pending',NULL,NULL,NULL),('7b004722-73c9-45ce-ae45-588be1711d07','3bfb69f4-070e-4537-88e4-bbac71279a6b','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,'Kaju Katli',NULL),('7cc1022c-3258-4e29-b908-23597a11f866','f8e1918a-6529-4a19-bc8b-11620af09b47','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',4,500.00,'Pending',NULL,NULL,NULL),('7febd07f-5245-4da7-8856-05a9df39983a','46b4e281-80b8-4c74-906e-7269538b60b4','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',3,299.00,'Pending',NULL,'Kachori',NULL),('849f62c9-1f4a-4821-bb80-2ff4138f4f1a','cd996627-fa7f-4d0c-9c0a-e3d47326cd0c','84271a22-0d38-43b1-9318-47c433714f8d','5f4e4fad-43f5-4274-b00f-4c1f428b8bef',1,569.00,'Shipped',NULL,NULL,NULL),('899197c0-bffc-452a-89cc-3f338e76011d','1c4a4155-247f-4686-be02-ce78c22e45ce','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',3,299.00,'Pending',NULL,'Kachori',NULL),('94b32d19-6908-4e28-a41b-96c47a4a374a','5a342d15-f8ee-41fa-aef6-48482ab3ec4b','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,NULL,NULL),('9575c482-7aa1-4af0-9545-2f1546644617','f26593b0-0b8b-4849-9075-210e53bbafd0','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',3,299.00,'Pending',NULL,'Kachori',NULL),('96358cce-0596-4e64-8c26-4f5abb3b06a3','8371958b-5317-4270-bd47-fd6b59023ffc','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',1,299.00,'Pending',NULL,NULL,NULL),('963ea370-09d2-4b2a-a844-e9b50fbcaa60','5bd975cc-ff74-421b-bf20-5bc691406f72','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',1,299.00,'Pending',NULL,NULL,NULL),('99b3ca8e-6dc8-44c7-8954-2f43a3a6a032','9e7dbab1-a805-4805-8189-ca0784251666','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,'Kaju Katli',NULL),('9feb7a2b-8496-4558-b484-f1b8e3001d1f','a6a62cf4-1329-4768-8322-a4a8ff393e2f','84271a22-0d38-43b1-9318-47c433714f8d','5f4e4fad-43f5-4274-b00f-4c1f428b8bef',1,569.00,'Canceled',NULL,NULL,NULL),('a6359081-90f4-463e-a19c-b6e68d89fc24','e46f2913-a627-499d-85e5-9db1b2defca2','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',3,299.00,'Pending',NULL,'Kachori',NULL),('a80fba96-6d24-4da2-96d4-54fcfb138533','f26593b0-0b8b-4849-9075-210e53bbafd0','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',3,500.00,'Pending',NULL,'Kaju Katli',NULL),('b6d8feea-518f-4b21-b212-f17b32d202f1','046fa554-cc43-4b54-bf73-4f07e0ef7344','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,NULL,NULL),('b7467404-15c2-4465-bcea-60977cdd9295','30825020-3b6d-4410-9742-20c762d96f28','0c843f04-6032-40b1-80f6-57450744f52f','6771d2b8-fa4e-402c-9af5-70d8bd5f21fa',1,499.00,'Pending',NULL,NULL,NULL),('b9d41ab7-f18c-41e5-b449-16d4825b8a66','184018f8-0532-4f4a-9817-34a0a90b690e','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',2,299.00,'Pending',NULL,NULL,NULL),('c114c83f-00f3-49cb-ba8e-113689784827','37ad900d-e288-4c7a-877f-cd1d2d6eefe3','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',3,500.00,'Pending',NULL,NULL,NULL),('c32d2b97-8f15-456c-ac1b-7809d9396852','c1e23611-ca0b-4b4d-b818-d918eeb91bde','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,NULL,NULL),('c4e76717-db35-4083-866b-9c64db0f0dc2','6e855655-4193-4bbd-b5e2-4bf1904bfdf0','b5f62df3-92bd-460c-a15c-a6e2b3112129','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',1,1998.00,'Pending',NULL,NULL,NULL),('c5394c43-0c34-4f7b-a983-58c7b5eb74f9','e39de58b-3c38-431b-83b0-2c04bfde182e','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',2,500.00,'Pending',NULL,NULL,NULL),('c74721ab-7797-4ca8-a807-d3e842b0f406','220cb6e4-5c65-44bf-a79a-eedc97a3219d','0c843f04-6032-40b1-80f6-57450744f52f','6771d2b8-fa4e-402c-9af5-70d8bd5f21fa',1,499.00,'Pending',NULL,NULL,NULL),('c76e19b6-7c22-431d-968c-212c7ea27e6b','81c9bbff-1e2c-4b31-bff8-47f92443a990','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,NULL,NULL),('cca16192-22c4-459f-b5c9-d47189f804b3','fee853b3-3113-4571-85ce-2ba37e16f2ef','0c843f04-6032-40b1-80f6-57450744f52f','6771d2b8-fa4e-402c-9af5-70d8bd5f21fa',1,499.00,'Delivered','2026-09-28 14:02:55',NULL,'59754962-f321-4f8e-b16d-c3f4ebd09380'),('ceae151e-9483-461e-a9a2-3bc95d15dbc8','c42edf15-ab3b-4929-9900-9a3ed77f3d2a','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,NULL,NULL),('cf978d95-80a5-4fbf-b442-04af11de7841','d6c43eef-8fc8-443e-823d-ccd959b840a1','0c843f04-6032-40b1-80f6-57450744f52f','6771d2b8-fa4e-402c-9af5-70d8bd5f21fa',1,499.00,'Pending',NULL,NULL,NULL),('d439d08a-e1eb-4c4f-ab7d-b44c44238f71','1c8ee471-62a8-4285-8a58-48a2a08142af','0c843f04-6032-40b1-80f6-57450744f52f','6771d2b8-fa4e-402c-9af5-70d8bd5f21fa',1,499.00,'Pending',NULL,NULL,NULL),('d8c6327d-7008-4a99-93a9-e73d63e9b084','9e7dbab1-a805-4805-8189-ca0784251666','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',3,299.00,'Pending',NULL,'Kachori',NULL),('e020a5c6-3c04-4ec6-8ee4-fe509e5dfdf0','84ded4bc-f066-4825-85ba-d94f4b4561b7','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',3,299.00,'Pending',NULL,'Kachori',NULL),('e08ba9af-906a-4728-9b47-ff067f165c9a','220cb6e4-5c65-44bf-a79a-eedc97a3219d','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',1,299.00,'Pending',NULL,NULL,NULL),('e6d863cc-a646-4ca7-86e1-6e8bf144bf95','46b4e281-80b8-4c74-906e-7269538b60b4','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',4,500.00,'Pending',NULL,'Kaju Katli',NULL),('e8cc2346-dbc1-47b3-9357-49ea59c30cf0','9ca749a2-3404-4170-beaf-6b583247b215','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',1,500.00,'Pending',NULL,NULL,NULL),('ea992665-f666-4c09-96f2-d17656ca4eb1','6856954b-9a55-44fa-8fbd-3972ec9ee32e','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',1,299.00,'Pending',NULL,NULL,NULL),('eaae7130-17f3-4e75-8759-2073afa06388','1c4a4155-247f-4686-be02-ce78c22e45ce','39e7290e-5f27-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222',2,500.00,'Pending',NULL,'Kaju Katli',NULL),('eb2e3943-c27b-4ad4-a31a-d5b8baf4e3a1','822668bb-c20f-48ae-8ee1-69e99903d24c','231140f5-d564-40a9-b508-27bf340f2c01','2da25f90-6ab5-4e4e-8a06-6b9a606953c3',3,299.00,'Pending',NULL,'Kachori',NULL);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` char(36) NOT NULL,
  `customer_id` char(36) NOT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_status` enum('Paid','Pending','COD') NOT NULL DEFAULT 'Pending',
  `total_amount` decimal(10,2) NOT NULL,
  `razorpay_order_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('046fa554-cc43-4b54-bf73-4f07e0ef7344','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 13:34:24','Paid',500.00,'order_TRFbpJl72HxZuc'),('060e8fb4-49da-4aae-96c5-067bea21f013','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 12:18:09','Pending',859.00,NULL),('1151bceb-9d92-4965-b982-cd3a9b8b5b1f','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 13:11:06','Paid',500.00,'order_TRFDEUgvviNq9M'),('184018f8-0532-4f4a-9817-34a0a90b690e','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 13:18:02','Pending',598.00,NULL),('185acc86-8d78-4552-8ff9-4d04419da39c','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 12:15:07','Pending',359.00,NULL),('190e27ba-7793-4eb6-be72-751d04b17a1c','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-28 14:15:50','Paid',499.00,'order_ThUDYFGB4tjJY1'),('1c4a4155-247f-4686-be02-ce78c22e45ce','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 11:16:51','Pending',1897.00,NULL),('1c8ee471-62a8-4285-8a58-48a2a08142af','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-28 14:15:40','COD',1068.00,NULL),('1e5425d8-ea8f-432e-9d2d-122db45086ac','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-25 12:24:18','Paid',299.00,'order_TgGiQebSy1flnq'),('220cb6e4-5c65-44bf-a79a-eedc97a3219d','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-25 12:35:45','COD',798.00,NULL),('2868c043-546c-4b43-82d1-44499477ab98','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 13:18:27','Pending',500.00,NULL),('2e98beda-21c7-4972-a7ed-e046c74b7aa3','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 11:31:59','Pending',2397.00,NULL),('30825020-3b6d-4410-9742-20c762d96f28','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-25 13:14:07','Paid',499.00,'order_TgHZ2rESgbl1AM'),('37ad900d-e288-4c7a-877f-cd1d2d6eefe3','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 13:32:01','COD',1500.00,NULL),('3bfb69f4-070e-4537-88e4-bbac71279a6b','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 10:55:16','Pending',1397.00,NULL),('46b4e281-80b8-4c74-906e-7269538b60b4','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 11:50:44','Pending',2897.00,NULL),('4e178ad0-c7cb-4886-a886-253381cbf660','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-24 12:32:24','Paid',1000.00,'order_TfsK1uolCdfk0C'),('5a342d15-f8ee-41fa-aef6-48482ab3ec4b','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-19 13:31:55','COD',500.00,NULL),('5bd975cc-ff74-421b-bf20-5bc691406f72','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 12:44:47','Pending',299.00,NULL),('6856954b-9a55-44fa-8fbd-3972ec9ee32e','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-25 12:26:30','COD',299.00,NULL),('6cfbd7aa-4242-4618-92d9-7faec4f759b6','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-25 12:57:55','COD',569.00,NULL),('6e47345a-3cc3-4433-84b2-1766d0ad9af4','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-19 12:59:43','COD',1500.00,NULL),('6e855655-4193-4bbd-b5e2-4bf1904bfdf0','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-29 17:18:39','COD',1998.00,NULL),('7eb89d75-b3aa-4b2d-b39e-124b29fefbe6','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 12:46:46','Pending',299.00,NULL),('81c9bbff-1e2c-4b31-bff8-47f92443a990','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-19 13:23:51','COD',500.00,NULL),('822668bb-c20f-48ae-8ee1-69e99903d24c','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-17 14:52:12','Pending',897.00,NULL),('8371958b-5317-4270-bd47-fd6b59023ffc','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-24 13:35:17','COD',799.00,NULL),('84ded4bc-f066-4825-85ba-d94f4b4561b7','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 11:51:04','Pending',3096.00,NULL),('9ca749a2-3404-4170-beaf-6b583247b215','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-24 12:33:16','COD',500.00,NULL),('9e7dbab1-a805-4805-8189-ca0784251666','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-17 15:06:26','Pending',1397.00,NULL),('a0a46f7b-4dc1-4964-9a2e-ea277444a100','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 10:56:35','Pending',1397.00,NULL),('a5db77e7-ae97-4849-8759-f2025860026e','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-29 17:20:01','Paid',499.00,'order_ThvtEf0QQ4M5uq'),('a6a62cf4-1329-4768-8322-a4a8ff393e2f','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-25 12:25:17','COD',569.00,NULL),('a9d17bff-003d-480a-b94b-80ae0d27c7c8','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 11:33:12','Pending',2397.00,NULL),('aab507a2-b34a-4433-8408-2a3b594fe076','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 12:15:09','Pending',359.00,NULL),('c1e23611-ca0b-4b4d-b818-d918eeb91bde','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 13:17:34','Pending',799.00,NULL),('c42edf15-ab3b-4929-9900-9a3ed77f3d2a','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 13:07:34','Paid',500.00,'order_TRF9VBaRAban9A'),('c7c11792-06d9-4ee6-bc8a-3189d9851d60','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-24 13:10:38','COD',500.00,NULL),('c91588f1-264a-4af0-ba68-66085819760f','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 11:43:25','Pending',2897.00,NULL),('cb26db11-601f-43b4-96aa-d7ed919e9e45','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 12:13:08','Pending',359.00,NULL),('cc9960c6-bfdd-432b-b684-47bc85e90bd9','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 12:22:36','Pending',859.00,NULL),('cd996627-fa7f-4d0c-9c0a-e3d47326cd0c','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-25 11:57:24','COD',569.00,NULL),('d6c43eef-8fc8-443e-823d-ccd959b840a1','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-25 12:48:36','COD',1068.00,NULL),('e1b4f95e-a548-4e6c-8471-9b06a57f204a','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-24 16:19:23','Paid',569.00,'order_TfwBfZA7NTyTzD'),('e39de58b-3c38-431b-83b0-2c04bfde182e','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 13:19:44','Pending',1000.00,NULL),('e46f2913-a627-499d-85e5-9db1b2defca2','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-17 14:51:31','Pending',897.00,NULL),('f26593b0-0b8b-4849-9075-210e53bbafd0','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-18 11:33:59','Pending',2397.00,NULL),('f8e1918a-6529-4a19-bc8b-11620af09b47','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-08-19 12:59:02','Paid',2897.00,'order_TRdXcjk6rC6JNc'),('fc227d5b-88c5-4a3f-a71e-7cb257abe6fd','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-24 16:20:00','COD',299.00,NULL),('fee853b3-3113-4571-85ce-2ba37e16f2ef','0ed8624d-b0cf-427f-9c31-8850876bd145','2026-09-25 15:00:38','Paid',499.00,'order_TgJNZoyDvZqIDA');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `image_id` char(36) NOT NULL DEFAULT (uuid()),
  `product_id` char(36) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES ('22cb0ec4-7bc1-4bea-be1f-fa40e53edcff','b5f62df3-92bd-460c-a15c-a6e2b3112129','1781170512310.jpg','2026-06-11 09:35:12','2026-06-11 09:35:12'),('3a5a9cec-ae16-4118-9063-9b58d0018180','77a00356-f449-4ecf-ab55-b58834eb88fd','1781170157985.webp','2026-06-11 09:29:18','2026-06-11 09:29:18'),('43d4f0a1-0ba0-43ae-90fd-b82fc749b997','250d7666-1c1b-42ae-b7ff-0e3e1936daaf','1790266687676.jpg','2026-09-24 16:18:07','2026-09-24 16:18:07'),('44b9a674-049b-4bbc-a2f0-9b90856b7a4f','e0cf60ae-cba4-4afb-b459-40cf857cceac','1781172626471.webp','2026-06-11 10:10:26','2026-06-11 10:10:26'),('5f1e992a-1a4b-41be-81e7-93736f918d74','84271a22-0d38-43b1-9318-47c433714f8d','1790337327891.avif','2026-09-25 11:55:27','2026-09-25 11:55:27'),('71772426-68f5-4f6a-8e7a-c6a4bd4defa2','10548972-e23b-4c52-875b-24d53f7ec87c','1790258319840.jfif','2026-09-24 13:58:39','2026-09-24 13:58:39'),('73968e61-6475-44cb-bdf0-f68cb50e6fc0','5c4d3c69-8b1e-4232-88d4-5767304a2b45','1790265529741.jfif','2026-09-24 15:58:49','2026-09-24 15:58:49'),('8383450f-fc5c-469a-9e92-9761c198fb47','9733b208-5892-43c5-b56a-f7573b44622b','9e61d99c4adc9fcf51b34c4b26137eee','2026-06-11 09:16:08','2026-06-11 09:16:08'),('a634a276-d101-4d4b-8a82-2ddcf73741c5','fe3ea32e-2291-43fd-8edb-c13c5c36054c','fd9cf5d7677e93243a9731bba7f99338','2026-06-11 09:21:24','2026-06-11 09:21:24'),('ae7de28a-dc6d-44fc-b0dd-29d442993cfc','0c843f04-6032-40b1-80f6-57450744f52f','1790257354549.webp','2026-09-24 13:42:34','2026-09-24 13:42:34'),('c62a3687-54e2-4f3e-ac2f-73d4d1382341','c8fda72e-840e-47a3-9201-068c0333c915','e6f9ca65d80eeeb430e9297138e537f0','2026-06-11 09:18:32','2026-06-11 09:18:32'),('c9b00709-a42e-40cc-99bd-d024d3f2bc82','231140f5-d564-40a9-b508-27bf340f2c01','4481d3adf3dcbd8b0693afac0922dced','2026-06-11 09:26:10','2026-06-11 09:26:10'),('cde3f730-5f2d-11f1-af0f-0a0027000008','39e7290e-5f27-11f1-af0f-0a0027000008','/sweetsImages/kaju-katli.jpg','2026-06-03 09:22:55','2026-06-03 09:52:43');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` char(36) NOT NULL DEFAULT (uuid()),
  `product_name` varchar(45) NOT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `category` varchar(32) DEFAULT NULL,
  `category_type` varchar(16) NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `approval_status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `stock` int NOT NULL DEFAULT '0',
  `seller_id` char(36) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `seller_id` (`seller_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('0c843f04-6032-40b1-80f6-57450744f52f','Delight Assorted Chocolate Box','Product Detail:\r\nType - Chocolate Truffles\r\nModel Name-Premium Chocolate Gift Box ( Pack of 12 )\r\nMaximum Shelf Life-6 Months\r\nGourmet-Yes\r\nWith Nuts-Yes\r\nGift Pack-Yes\r\nFood Preference-Vegetarian\r\nIngredients-Chocolate','dessert','sweet',499,'approved','2026-09-24 13:42:34','2026-09-24 13:46:05',48,'6771d2b8-fa4e-402c-9af5-70d8bd5f21fa'),('10548972-e23b-4c52-875b-24d53f7ec87c','Classic Italian Tiramisu Cups - Eggless','Rich vanilla whipped cream and mascarpone…\r\n…with a good kick of coffee.\r\nNo bake and just 15 minutes of hands on time.\r\nThe perfect make ahead dessert.\r\nAn easy yet impressive dessert.','dessert','sweet',1899,'rejected','2026-09-24 13:58:39','2026-09-24 14:00:20',96,'6771d2b8-fa4e-402c-9af5-70d8bd5f21fa'),('231140f5-d564-40a9-b508-27bf340f2c01','Kachori','Hi mera naam h Kachori and i m very tasty','snacks','savory',299,'approved','2026-06-11 09:26:10','2026-06-11 09:56:54',300,'2da25f90-6ab5-4e4e-8a06-6b9a606953c3'),('250d7666-1c1b-42ae-b7ff-0e3e1936daaf','Spicy Loaded Cheese Nachos-Veg','Load up your nachos with Tillamook Mexican 4 Cheese, spicy jalapenos, and creamy avocado for a delicious, spicy twist on a classic snack.','snacks','savory',569,'approved','2026-09-24 16:18:07','2026-09-24 16:19:04',45,'fea2f687-df3a-477c-8371-f0596ae108ec'),('39e7290e-5f27-11f1-af0f-0a0027000008','Kaju Katli','Delicious kaju katli','Sweets','Veg',500,'approved','2026-06-03 08:35:50','2026-06-09 07:48:13',100,'22222222-2222-2222-2222-222222222222'),('5c4d3c69-8b1e-4232-88d4-5767304a2b45','Classic Italian Tiramisu Cups - Eggless','Tiramisu is a famous no-bake Italian dessert made by layering coffee-soaked ladyfingers with a rich, whipped mixture of mascarpone cheese, eggs, and sugar, finished with a dusting of cocoa powder','dessert','sweet',1899,'approved','2026-09-24 15:58:49','2026-09-24 15:59:53',64,'fea2f687-df3a-477c-8371-f0596ae108ec'),('77a00356-f449-4ecf-ab55-b58834eb88fd','Khakra','my name is kHAKRA','khakra','savory',199,'approved','2026-06-11 09:29:17','2026-06-11 09:56:54',100,'2da25f90-6ab5-4e4e-8a06-6b9a606953c3'),('84271a22-0d38-43b1-9318-47c433714f8d','Cheesy Cheese Pastry - Eggless','If sausage rolls are a hit at your home, try this bacon egg and cheese pastry recipe for an easy Christmas brunch! ','snacks','savory',569,'approved','2026-09-25 11:55:27','2026-09-25 11:56:12',56,'5f4e4fad-43f5-4274-b00f-4c1f428b8bef'),('9733b208-5892-43c5-b56a-f7573b44622b','Gulab Jamun','hello i M gULAB jAMUN','dessert','sweet',359,'approved','2026-06-11 09:16:08','2026-06-11 09:56:54',200,'2da25f90-6ab5-4e4e-8a06-6b9a606953c3'),('b5f62df3-92bd-460c-a15c-a6e2b3112129','White Chocolate Badam Burfi','Chocolate Badam Burfi meri hai','burfi','sweet',1998,'approved','2026-06-11 09:35:12','2026-06-11 09:56:54',500,'2da25f90-6ab5-4e4e-8a06-6b9a606953c3'),('c8fda72e-840e-47a3-9201-068c0333c915','Gulab Jamun','Hello i m Gulab Jamun','dessert','sweet',559,'approved','2026-06-11 09:18:32','2026-06-11 09:56:54',200,'2da25f90-6ab5-4e4e-8a06-6b9a606953c3'),('e0cf60ae-cba4-4afb-b459-40cf857cceac','Besan Laddo','Mai hoon gol gol besan laddo','ladoo','sweet',229,'approved','2026-06-11 10:10:26','2026-06-11 10:11:02',200,'2da25f90-6ab5-4e4e-8a06-6b9a606953c3'),('fe3ea32e-2291-43fd-8edb-c13c5c36054c','Gulab Jamun','Hello i m Gulab Jamun','dessert','sweet',559,'approved','2026-06-11 09:21:24','2026-06-11 09:56:54',200,'2da25f90-6ab5-4e4e-8a06-6b9a606953c3');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  `customer_id` char(36) NOT NULL,
  `seller_id` char(36) NOT NULL,
  `rating` int DEFAULT NULL,
  `comment` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `product_id` (`product_id`),
  KEY `customer_id` (`customer_id`),
  KEY `seller_id` (`seller_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `review_ibfk_3` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES ('435df4d0-950a-45ed-b2c2-b788f0c35d9d','0c843f04-6032-40b1-80f6-57450744f52f','0ed8624d-b0cf-427f-9c31-8850876bd145','6771d2b8-fa4e-402c-9af5-70d8bd5f21fa',5,'ghhhhhhhhhhhhh','2026-09-24 22:15:51'),('73f99702-7843-487c-8ecd-b5a50bbeedd9','250d7666-1c1b-42ae-b7ff-0e3e1936daaf','0ed8624d-b0cf-427f-9c31-8850876bd145','fea2f687-df3a-477c-8371-f0596ae108ec',5,'6777777777777777','2026-09-28 19:47:15');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller`
--

DROP TABLE IF EXISTS `seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller` (
  `seller_id` char(36) NOT NULL,
  `registered_user_id` char(36) NOT NULL,
  `business_name` varchar(255) NOT NULL,
  `phone_number` varchar(32) NOT NULL,
  `approval_status` enum('pending','approved','rejected') DEFAULT 'pending',
  PRIMARY KEY (`seller_id`),
  KEY `registered_user_id` (`registered_user_id`),
  CONSTRAINT `seller_ibfk_1` FOREIGN KEY (`registered_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller`
--

LOCK TABLES `seller` WRITE;
/*!40000 ALTER TABLE `seller` DISABLE KEYS */;
INSERT INTO `seller` VALUES ('22222222-2222-2222-2222-222222222222','11111111-1111-1111-1111-111111111111','Anushka Sweet Store','9876543210','approved'),('2da25f90-6ab5-4e4e-8a06-6b9a606953c3','deb63cf7-89dd-40eb-8bef-b28f89e0f900','Global Sweets','7865493210','approved'),('5f4e4fad-43f5-4274-b00f-4c1f428b8bef','59410c61-6dd0-47f0-9a20-7ce9a8ed7aa1','BakeOn','6789345621','approved'),('6771d2b8-fa4e-402c-9af5-70d8bd5f21fa','73952498-203e-40f4-8a15-01e8fd41b70f','britania sweet store','6574831234','approved'),('9386523c-9d25-449c-8f02-e11ec3d9141f','b3cf6973-2551-480e-9cd9-e9519e5a4a81','britania sweet store','6574831234','rejected'),('fea2f687-df3a-477c-8371-f0596ae108ec','d3716c2f-ab7d-42f0-8e0f-19eddddda34b','Snowberry Yours','7894561231','approved');
/*!40000 ALTER TABLE `seller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_store_address`
--

DROP TABLE IF EXISTS `seller_store_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller_store_address` (
  `seller_address_id` char(36) NOT NULL,
  `seller_id` char(36) NOT NULL,
  `address_line_1` varchar(255) NOT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(127) NOT NULL,
  `country` varchar(127) NOT NULL,
  `zip_code` varchar(16) NOT NULL,
  PRIMARY KEY (`seller_address_id`),
  KEY `seller_id` (`seller_id`),
  CONSTRAINT `seller_store_address_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_store_address`
--

LOCK TABLES `seller_store_address` WRITE;
/*!40000 ALTER TABLE `seller_store_address` DISABLE KEYS */;
INSERT INTO `seller_store_address` VALUES ('2e566107-ed65-4fe5-93b9-73b125ddce5d','fea2f687-df3a-477c-8371-f0596ae108ec','Noida Sector 18 Near Wave Mall, 201301, UttarPradesh, India','','Noida','India','201301'),('309c04e7-4455-4b92-bf05-dba207cc0e5c','2da25f90-6ab5-4e4e-8a06-6b9a606953c3','Rana Road','Shop No. 12','Noida','India','201301'),('49fc2590-5c6e-4ccd-84d2-3a3385b25d7b','9386523c-9d25-449c-8f02-e11ec3d9141f','delhi safdarganj market','near metro station','delhi','India','201309'),('771f606a-a681-4491-89f8-5e00fecd9003','6771d2b8-fa4e-402c-9af5-70d8bd5f21fa','delhi safdarganj market','near metro station','delhi','India','201309'),('8e4130de-5f34-11f1-af0f-0a0027000008','22222222-2222-2222-2222-222222222222','Shastri Nagar',NULL,'Ghaziabad','India','201002'),('9dbaef72-0b24-4b56-81be-bdf0280f635d','5f4e4fad-43f5-4274-b00f-4c1f428b8bef','Plot No - M 03, Sector 18, Noida 201301 (NCR), India.','UttarPradesh','Noida','India','201301');
/*!40000 ALTER TABLE `seller_store_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` char(36) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('customer','seller','admin','delivery_partner') NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `password` (`password`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('07d7351f-543e-4a51-b29c-7ca0af8e8407','$2b$10$.9Y5WHll27dRXSSI.nquu.OzkWkgXTmnmElcfZ4kfGj5UgOg/M9Gq','anju123@gmail.com','customer'),('11111111-1111-1111-1111-111111111111','test123','seller@test.com','seller'),('373d30b2-b3ff-4240-bb0f-590213165b5c','$2b$10$nfM465REhdo8S4SzqZREjexJUEAkp29JUmxSPCzNEFWHhjxP7dbTS','test5@gmail.com','customer'),('3ee6919f-8574-4250-8175-9bf546f8fe28','$2b$10$Ha57a3jW6uzRu0mtQPfrB.QG37l03AlEcIDvS2a6KNKWbtQjx8VXu','mili123@gmail.com','customer'),('47d3958c-76e8-4054-89ca-553e0ac983ff','$2b$10$eWwD2G5b2r8eAalx511hi.Bl4p2g2Wa1pn/uj/MBGObz8QVDfZs/K','test2@gmail.com','seller'),('59410c61-6dd0-47f0-9a20-7ce9a8ed7aa1','$2b$10$P70FqXUktEzn585GsS1LfuDITd0ypzvb0yzSRFnmkhke82OMfpttu','bakeon5@gmail.com','seller'),('6eed47be-b0ed-4268-ba3b-4f53395fd8b5','$2b$10$GJVwZnB5U9QjqXhZnCrutOMTXDHtZ0Vt/nB21QebOGChIqlYGEBgq','deliverytest@gmail.com','delivery_partner'),('719cfce9-5355-4504-b2fa-a3b7e67302f5','$2b$10$NzHpgwxH20MIG4Ax1fqyquYzYdBDhv47nAh65Ggj/BAGOyWJKo2FG','test1@gmail.com','delivery_partner'),('72b29fb3-9b14-49ec-9252-90babae2eadb','$2b$10$JU5KmmFtTtHMxqa64BArw.oR0BlHhWzDk0AIlCLsa5jzJz4cviQke','anushkashrivastava1018@gmail.com','customer'),('73952498-203e-40f4-8a15-01e8fd41b70f','$2b$10$o5ghqSDLnD1mQ4Jkh0TPsOHti5PL/Wu/HtDmxjx0BeYJ6DPY4fm66','test12345@gmail.com','seller'),('7de3be1d-04f5-4a68-8aac-816610dd67a4','$2b$10$WYOlJ5Inc5KuCpvpDFiQtu.2gYKEhXi6IjtNBNni68ie6V1ZUdMRO','anushka12345@test.com','seller'),('9dcfd745-1bde-4ad0-a29c-8ee0ae4a9ea2','$2b$10$rofMHVgZScKDHFi4QipMq.LHB0fsNGLcFq4gh5sQOAUaic.Y3qgWW','admin@example.com','admin'),('b3cf6973-2551-480e-9cd9-e9519e5a4a81','$2b$10$bhG14MJLsJ9qSG/L9.pR/O8z3qnsikyWLowq7z5Dlrkmze6n9w.ru','test123@gmail.com','seller'),('bbceb641-8c51-48e4-bd4d-7343e69842da','$2b$10$XYKs3iUrVTKsO.CIn82kMuO.0C8xVzTgX6AEaVCt9SY.NV.Hi9UWK','anushka1@test.com','seller'),('d3716c2f-ab7d-42f0-8e0f-19eddddda34b','$2b$10$GKsiBe0LtrXk4YUgFhb/x.kO5OiiOXFZ530hUco3y.daZKeNwUfHK','test9@gmail.com','seller'),('deb63cf7-89dd-40eb-8bef-b28f89e0f900','$2b$10$A/4kvO/jz4KFLLMo20YsPulmlZFCIwdhJJe2Saqu3b5y.0DK0xiaq','test3@gmail.com','seller');
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

-- Dump completed on 2026-10-05 20:06:45
