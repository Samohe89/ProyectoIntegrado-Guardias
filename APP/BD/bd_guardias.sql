-- CREACIÓN DE BASE DE DATOS
CREATE DATABASE IF NOT EXISTS app_guardias;
USE app_guardias;

-- CREACIÓN DE TABLAS
CREATE TABLE IF NOT EXISTS profesor (
    DNIProfesor VARCHAR(10) NOT NULL,
    NombreProfesor VARCHAR(100) NOT NULL,
    ClaveProfesor VARCHAR(25) NOT NULL,
    Usuario VARCHAR(15) UNIQUE NOT NULL,
    CursoAcademico VARCHAR(7) NOT NULL,
    NombreDepartamento VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    Alias VARCHAR(5) UNIQUE NOT NULL,   
    PRIMARY KEY (DNIProfesor, CursoAcademico)
);

CREATE TABLE IF NOT EXISTS roles (
    Rol VARCHAR(50) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS profesorroles (
    Rol VARCHAR(50) NOT NULL,
    DNIProfesor VARCHAR(10) NOT NULL,
    GrupoTutoria VARCHAR(20) NOT NULL,
    CursoAcademico VARCHAR(7) NOT NULL,  
    PRIMARY KEY (DNIProfesor, CursoAcademico, Rol),
    FOREIGN KEY (DNIProfesor, CursoAcademico) REFERENCES profesor(DNIProfesor, CursoAcademico),
    FOREIGN KEY (Rol) REFERENCES roles(Rol)
);

CREATE TABLE IF NOT EXISTS horariosprofesor (
    NumRegistro INT(11) PRIMARY KEY,
    Grupo VARCHAR(20) NOT NULL,
    Profesor VARCHAR(20) NOT NULL,
    Asignatura VARCHAR(50) NOT NULL,
    Aula VARCHAR(20) NOT NULL,
    Dia INT(11) NOT NULL,
    Hora INT(11) NOT NULL,
    Curso VARCHAR(7) NOT NULL,
    DNIProfesor VARCHAR(10) NOT NULL,
    FOREIGN KEY (DNIProfesor, Curso) REFERENCES profesor(DNIProfesor, CursoAcademico)
);

CREATE TABLE IF NOT EXISTS ausenciasprofesor (
    ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    NumRegistro INT(11) NOT NULL,
    FechaAusencia DATE NOT NULL,
    Comentario LONGTEXT NOT NULL,
    Tarea LONGTEXT,
    Fichero MEDIUMBLOB,
    ProfesorAusente VARCHAR(10) NOT NULL,
    CursoAcademico VARCHAR(7) NOT NULL, 
    FOREIGN KEY (NumRegistro) REFERENCES horariosprofesor(NumRegistro),
    FOREIGN KEY (ProfesorAusente, CursoAcademico) REFERENCES profesor(DNIProfesor, CursoAcademico)
);


CREATE TABLE IF NOT EXISTS guardiasprofesor (
    IdGuardia BIGINT AUTO_INCREMENT PRIMARY KEY,
    Grupo VARCHAR(20) NOT NULL,
    Tramo INT(1) NOT NULL,
    Duracion INT(10) NOT NULL,
    IdAusencia BIGINT NOT NULL,
    ProfesorGuardia VARCHAR(10) NOT NULL,
    CursoAcademico  VARCHAR(7) NOT NULL,
    FOREIGN KEY (IdAusencia) REFERENCES ausenciasprofesor(ID),
    FOREIGN KEY (ProfesorGuardia, CursoAcademico) REFERENCES profesor(DNIProfesor, CursoAcademico)
);


-- CREACIÓN DE REGISTROS BASE
INSERT INTO profesor VALUES 
('48878932E','Morales Pacheco, Ramón Javier','ramon','ramon','2024','Informática','ramon_javier.morales@iesalmudeyne.es','INF08'),
('12345678A','Hans Uber, Manuel','manuel','manuel','2024','Informática','manuel_hans@iesalmudeyne.es','INF03'),
('98765432Z','Tagua Reina, Juan','tagua','tagua','2024','Informática','jtagrei226@g.educaand.es','INF05')
;

INSERT INTO roles VALUES ('Coordinador TIC'),('Equipo Directivo'),('Profesor');

INSERT INTO `profesorroles` VALUES 
('Coordinador TIC','48878932E','','2024'),
('Equipo Directivo','48878932E','','2024'),
('Profesor','48878932E','1SMR A','2024'),
('Profesor','12345678A','','2024'),
('Profesor','98765432Z','','2024')
;

INSERT INTO `horariosprofesor` VALUES 
(1,'2º DAW','INF08','Desarrollo Web Entorno Cliente','2DAW',1,3,'2024','48878932E'),
(2,'2º DAW','INF08','Desarrollo Web Entorno Cliente','2DAW',1,4,'2024','48878932E'),
(3,'2º DAW','INF08','Desarrollo Web Entorno Cliente','2DAW',1,5,'2024','48878932E'),
(4,'2º DAW','INF08','Desarrollo Web Entorno Cliente','2DAW',3,3,'2024','48878932E'),
(5,'2º DAW','INF08','Desarrollo Web Entorno Cliente','2DAW',3,4,'2024','48878932E'),
(6,'2º DAW','INF08','Desarrollo Web Entorno Cliente','2DAW',3,5,'2024','48878932E'),
(7,'2º DAW','INF08','Desarrollo Web Entorno Cliente','2DAW',3,6,'2024','48878932E'),
(8,'2º DAW','INF08','Desarrollo Web Entorno Cliente','2DAW',4,2,'2024','48878932E'),
(9,'2º DAW','INF08','Desarrollo Web Entorno Cliente','2DAW',4,3,'2024','48878932E'),
(10,'2º DAW','INF08','Desarrollo Web Entorno Cliente','2DAW',4,4,'2024','48878932E'),
(11,'2º DAW','INF03','Desarrollo Web Entorno Servidor','2DAW',1,1,'2024','12345678A'),
(12,'2º DAW','INF03','Desarrollo Web Entorno Servidor','2DAW',1,2,'2024','12345678A'),
(13,'2º DAW','INF03','Desarrollo Web Entorno Servidor','2DAW',2,1,'2024','12345678A'),
(14,'2º DAW','INF03','Desarrollo Web Entorno Servidor','2DAW',2,2,'2024','12345678A'),
(15,'2º DAW','INF03','Desarrollo Web Entorno Servidor','2DAW',4,1,'2024','12345678A'),
(16,'2º DAW','INF03','Desarrollo Web Entorno Servidor','2DAW',5,2,'2024','12345678A'),
(17,'2º DAW','INF03','Desarrollo Web Entorno Servidor','2DAW',5,3,'2024','12345678A'),
(18,'2º DAW','INF03','Desarrollo Web Entorno Servidor','2DAW',5,4,'2024','12345678A'),
(19, '1º DAW', 'INF03', 'Programación', '1DAW', 1, 3, '2024', '12345678A'),
(20, '1º DAW', 'INF03', 'Programación', '1DAW', 1, 4, '2024', '12345678A'),
(21, '1º DAW', 'INF03', 'Programación', '1DAW', 3, 2, '2024', '12345678A'),
(22, '1º DAW', 'INF03', 'Programación', '1DAW', 3, 3, '2024', '12345678A'),
(23, '1º DAW', 'INF03', 'Programación', '1DAW', 4, 3, '2024', '12345678A'),
(24, '1º DAW', 'INF03', 'Programación', '1DAW', 4, 4, '2024', '12345678A'),
(25, '1º DAW', 'INF03', 'Programación', '1DAW', 2, 3, '2024', '12345678A'),
(26, '1º DAW', 'INF03', 'Programación', '1DAW', 2, 4, '2024', '12345678A'),
(27,'2º DAW','INF05','Despliegue de Aplicaciones Web','2DAW',2,3,'2024','98765432Z'),
(28,'2º DAW','INF05','Despliegue de Aplicaciones Web','2DAW',3,1,'2024','98765432Z'),
(29,'2º DAW','INF05','Despliegue de Aplicaciones Web','2DAW',3,2,'2024','98765432Z'),
(30, '1º DAW', 'INF05', 'Lenguaje de Marcas', '1DAW', 3, 4, '2024', '98765432Z'),
(31, '1º DAW', 'INF05', 'Lenguaje de Marcas', '1DAW', 3, 5, '2024', '98765432Z'),
(32, '1º DAW', 'INF05', 'Lenguaje de Marcas', '1DAW', 4, 2, '2024', '98765432Z'),
(33, '1º DAW', 'INF05', 'Lenguaje de Marcas', '1DAW', 5, 2, '2024', '98765432Z'),
(34, '1º DAW', 'INF05', 'Entornos de Desarrollo', '1DAW', 1, 1, '2024', '98765432Z'),
(35, '1º DAW', 'INF05', 'Entornos de Desarrollo', '1DAW', 1, 2, '2024', '98765432Z'),
(36, '1º DAW', 'INF05', 'Entornos de Desarrollo', '1DAW', 5, 1, '2024', '98765432Z')
;


INSERT INTO ausenciasprofesor (NumRegistro, FechaAusencia, Comentario, Tarea, ProfesorAusente, CursoAcademico) VALUES
(25, '2024-09-17', 'Enfermedad', 'Conceptos de programación orientada a objetos', '12345678A', '2024'),
(26, '2024-09-17', 'Enfermedad', 'Conceptos de programación orientada a objetos', '12345678A', '2024'),
(27, '2024-10-01', 'Baja laboral', 'Practica 01 - Colaborativo en GIT', '98765432Z', '2024'),
(25, '2024-10-01', 'Baja laboral', 'Boletin 01. Ejercicios 1 a 3', '12345678A', '2024'),
(26, '2024-10-01', 'Baja laboral', 'Boletin 01. Ejercicios 1 a 3', '12345678A', '2024'),
(8, '2024-10-23', 'Intervención quirúrgica', 'Boletin02. Ejecicios 6 a 10', '48878932E', '2024'),
(9, '2024-10-23', 'Intervención quirúrgica', 'Boletin02. Ejecicios 6 a 10', '48878932E', '2024'),
(10, '2024-10-23', 'Intervención quirúrgica', 'Boletin02. Ejecicios 6 a 10', '48878932E', '2024'),
(34, '2024-11-04', 'Baja laboral', 'Investigar sobre tres IDE distintos', '98765432Z', '2024'),
(35, '2024-11-04', 'Baja laboral', 'Investigar sobre tres IDE distintos', '98765432Z', '2024'),
(16, '2024-11-15', 'Consulta médica', 'Boletin03 - Ejercicios 4 a 8', '12345678A', '2024'),
(17, '2024-11-15', 'Consulta médica', 'Boletin03 - Ejercicios 4 a 8', '12345678A', '2024'),
(18, '2024-11-15', 'Consulta médica', 'Boletin03 - Ejercicios 4 a 8', '12345678A', '2024'),
(27, '2024-12-10', 'Enfermedad', NULL, '98765432Z', '2024'),
(25, '2024-12-10', 'Enfermedad', NULL, '12345678A', '2024'),
(26, '2024-12-10', 'Enfermedad', NULL, '12345678A', '2024'),
(1, '2025-01-06', 'Consulta médica', NULL, '48878932E', '2024'),
(2, '2025-01-06', 'Consulta médica', NULL, '48878932E', '2024'),
(3, '2025-01-06', 'Consulta médica', NULL, '48878932E', '2024'),
(27, '2025-03-11', 'Enfermedad', NULL, '98765432Z', '2024'),
(25, '2025-03-11', 'Enfermedad', NULL, '12345678A', '2024'),
(26, '2025-03-11', 'Enfermedad', NULL, '12345678A', '2024'),
(34, '2025-04-15', 'Baja laboral', NULL, '98765432Z', '2024'),
(35, '2025-04-15', 'Baja laboral', NULL, '98765432Z', '2024'),
(8, '2025-06-05', 'Consulta médica', 'Desarrollo de aplicación angular', '48878932E', '2024'),
(9, '2025-06-05', 'Consulta médica', 'Desarrollo de aplicación angular', '48878932E', '2024'),
(10, '2025-06-05', 'Consulta médica', 'Desarrollo de aplicación angular', '48878932E', '2024')
;


INSERT INTO `guardiasprofesor` (`Grupo`, `Tramo`, `Duracion`, `IdAusencia`, `ProfesorGuardia`, `CursoAcademico`) VALUES
('1º DAW', 1, 15, 1, '48878932E', '2024'),
('1º DAW', 2, 15, 1, '48878932E', '2024'),
('1º DAW', 3, 15, 1, '98765432Z', '2024'),
('1º DAW', 4, 15, 1, '98765432Z', '2024'),
('1º DAW', 5, 60, 2, '98765432Z', '2024'),
('2º DAW', 5, 60, 3, '48878932E', '2024'),
('1º DAW', 1, 15, 4, '98765432Z', '2024'),
('1º DAW', 2, 15, 4, '98765432Z', '2024'),
('1º DAW', 3, 15, 4, '98765432Z', '2024'),
('1º DAW', 4, 15, 4, '48878932E', '2024'),
('1º DAW', 5, 60, 5, '98765432Z', '2024'),
('2º DAW', 5, 60, 6, '12345678A', '2024'),
('2º DAW', 1, 15, 7, '98765432Z', '2024'),
('2º DAW', 2, 15, 7, '12345678A', '2024'),
('2º DAW', 3, 15, 7, '12345678A', '2024'),
('2º DAW', 4, 15, 7, '12345678A', '2024'),
('2º DAW', 5, 60, 8, '12345678A', '2024'),
('1º DAW', 5, 60, 9, '48878932E', '2024'),
('1º DAW', 3, 15, 10, '12345678A', '2024'),
('1º DAW', 4, 15, 10, '12345678A', '2024'),
('1º DAW', 1, 15, 10, '48878932E', '2024'),
('1º DAW', 2, 15, 10, '48878932E', '2024'),
('2º DAW', 5, 60, 11, '98765432Z', '2024'),
('2º DAW', 5, 60, 12, '48878932E', '2024'),
('2º DAW', 1, 15, 13, '48878932E', '2024'),
('2º DAW', 2, 15, 13, '98765432Z', '2024'),
('2º DAW', 3, 15, 13, '98765432Z', '2024'),
('2º DAW', 4, 15, 13, '98765432Z', '2024'),
('2º DAW', 5, 60, 14, '12345678A', '2024'),
('1º DAW', 5, 60, 15, '48878932E', '2024'),
('1º DAW', 1, 15, 16, '98765432Z', '2024'),
('1º DAW', 2, 15, 16, '98765432Z', '2024'),
('1º DAW', 3, 15, 16, '98765432Z', '2024'),
('1º DAW', 4, 15, 16, '98765432Z', '2024'),
('2º DAW', 5, 60, 17, '12345678A', '2024'),
('2º DAW', 1, 15, 18, '12345678A', '2024'),
('2º DAW', 2, 15, 18, '12345678A', '2024'),
('2º DAW', 3, 15, 18, '98765432Z', '2024'),
('2º DAW', 4, 15, 18, '98765432Z', '2024'),
('2º DAW', 5, 60, 19, '12345678A', '2024'),
('2º DAW', 1, 15, 20, '12345678A', '2024'),
('2º DAW', 2, 15, 20, '12345678A', '2024'),
('2º DAW', 3, 15, 20, '48878932E', '2024'),
('2º DAW', 4, 15, 20, '48878932E', '2024'),
('1º DAW', 1, 15, 21, '48878932E', '2024'),
('1º DAW', 2, 15, 21, '48878932E', '2024'),
('1º DAW', 3, 15, 21, '98765432Z', '2024'),
('1º DAW', 4, 15, 21, '98765432Z', '2024'),
('1º DAW', 5, 60, 22, '98765432Z', '2024'),
('1º DAW', 5, 60, 23, '12345678A', '2024'),
('1º DAW', 1, 15, 24, '12345678A', '2024'),
('1º DAW', 2, 15, 24, '12345678A', '2024'),
('1º DAW', 3, 15, 24, '48878932E', '2024'),
('1º DAW', 4, 15, 24, '48878932E', '2024'),
('2º DAW', 5, 60, 25, '98765432Z', '2024'),
('2º DAW', 1, 15, 26, '12345678A', '2024'),
('2º DAW', 2, 15, 26, '98765432Z', '2024'),
('2º DAW', 3, 15, 26, '98765432Z', '2024'),
('2º DAW', 4, 15, 26, '98765432Z', '2024'),
('2º DAW', 5, 60, 27, '98765432Z', '2024')
;









