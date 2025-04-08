

DROP TABLE IF EXISTS `horariosprofesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `horariosprofesor` (
  `NumRegistro` int(11) NOT NULL,
  `Grupo` varchar(20) NOT NULL,
  `Profesor` varchar(20) NOT NULL,
  `Asignatura` varchar(20) NOT NULL,
  `Aula` varchar(20) NOT NULL,
  `Dia` int(11) NOT NULL,
  `Hora` int(11) NOT NULL,
  `Curso` int(11) NOT NULL,
  PRIMARY KEY (`NumRegistro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horariosprofesor`
--

LOCK TABLES `horariosprofesor` WRITE;
/*!40000 ALTER TABLE `horariosprofesor` DISABLE KEYS */;
INSERT INTO `horariosprofesor` VALUES (1,'2º DAW','INF08','CLIENTE','DAW',1,4,2024),(2,'2º DAW','INF08','CLIENTE','DAW',1,3,2024),(3,'2º DAW','INF08','CLIENTE','DAW',1,5,2024),(4,'2º DAW','INF08','CLIENTE','DAW',3,3,2024),(5,'2º DAW','INF08','CLIENTE','DAW',3,4,2024),(6,'2º DAW','INF08','CLIENTE','DAW',3,5,2024),(7,'2º DAW','INF08','CLIENTE','DAW',3,6,2024),(8,'2º DAW','INF08','CLIENTE','DAW',4,2,2024),(9,'2º DAW','INF08','CLIENTE','DAW',4,3,2024),(10,'2º DAW','INF08','CLIENTE','DAW',4,4,2024);
/*!40000 ALTER TABLE `horariosprofesor` ENABLE KEYS */;
UNLOCK TABLES;




DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profesor` (
  `DNIProfesor` varchar(10) NOT NULL,
  `NombreProfesor` varchar(100) NOT NULL,
  `ClaveProfesor` varchar(25) NOT NULL,
  `Usuario` varchar(15) NOT NULL,
  `CursoAcademico` varchar(7) NOT NULL,
  `NombreDepartamento` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `Alias` varchar(5) NOT NULL,
  PRIMARY KEY (`DNIProfesor`,`CursoAcademico`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` VALUES ('48878932E','Morales Pacheco, Ramón Javier','48878932E','rmorpac932','2024','Informática','ramon_javier.morales@iesalmudeyne.es','INF08');
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesorroles`
--

DROP TABLE IF EXISTS `profesorroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profesorroles` (
  `Rol` varchar(50) NOT NULL,
  `DNIProfesor` varchar(10) NOT NULL,
  `GrupoTutoria` varchar(20) NOT NULL,
  PRIMARY KEY (`Rol`,`DNIProfesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesorroles`
--

LOCK TABLES `profesorroles` WRITE;
/*!40000 ALTER TABLE `profesorroles` DISABLE KEYS */;
INSERT INTO `profesorroles` VALUES ('Coordinador TIC','48878932E',''),('Equipo Directivo','48878932E',''),('Profesor','48878932E','1SMR A');
/*!40000 ALTER TABLE `profesorroles` ENABLE KEYS */;
UNLOCK TABLES;




DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `Rol` varchar(50) NOT NULL,
  PRIMARY KEY (`Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('Coordinador TIC'),('Equipo Directivo'),('Profesor');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `ausenciasprofesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ausenciasprofesor` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NumRegistro` int(11) NOT NULL,
  `FechaAusencia` date NOT NULL,
  `Comentario` longtext NOT NULL,
  `Tarea` longtext NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_HorasProfesor` (`NumRegistro`),
  CONSTRAINT `FK_HorasProfesor` FOREIGN KEY (`NumRegistro`) REFERENCES `horariosprofesor` (`NumRegistro`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4909 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ausenciasprofesor`
--

LOCK TABLES `ausenciasprofesor` WRITE;
/*!40000 ALTER TABLE `ausenciasprofesor` DISABLE KEYS */;
/*!40000 ALTER TABLE `ausenciasprofesor` ENABLE KEYS */;
UNLOCK TABLES;