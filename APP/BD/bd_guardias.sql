-- CREACIÓN DE BASE DE DATOS
CREATE DATABASE IF NOT EXISTS app_guardias;
USE app_guardias;

-- CREACIÓN DE TABLAS
CREATE TABLE IF NOT EXISTS profesor (
    DNIProfesor VARCHAR(10) NOT NULL,
    NombreProfesor VARCHAR(100) NOT NULL,
    ClaveProfesor VARCHAR(25) NOT NULL,
    Usuario VARCHAR(15) NOT NULL,
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
    Fichero BLOB,
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
(1,'2º DAW','INF08','Desarrollo Web Entorno Cliente','2DAW',1,4,'2024','48878932E'),
(2,'2º DAW','INF08','Desarrollo Web Entorno Cliente','2DAW',1,3,'2024','48878932E'),
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
(19,'2º DAW','INF05','Despliegue de Aplicaciones Web','2DAW',2,3,'2024','98765432Z'),
(20,'2º DAW','INF05','Despliegue de Aplicaciones Web','2DAW',3,1,'2024','98765432Z'),
(21,'2º DAW','INF05','Despliegue de Aplicaciones Web','2DAW',3,2,'2024','98765432Z')
;



