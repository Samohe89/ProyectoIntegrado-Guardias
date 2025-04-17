-- CREACIÓN DE BASE DE DATOS
CREATE DATABASE IF NOT EXISTS app_guardias;
USE app_guardias;

-- CREACIÓN DE TABLAS
CREATE TABLE IF NOT EXISTS PROFESOR (
    IdProfesor BIGINT AUTO_INCREMENT PRIMARY KEY,
    DNIProfesor VARCHAR(10) NOT NULL UNIQUE,
    NombreProfesor VARCHAR(100) NOT NULL,
    ClaveProfesor VARCHAR(25) NOT NULL,
    Usuario VARCHAR(15) NOT NULL UNIQUE,
    CursoAcademico INT(4) NOT NULL,
    NombreDepartamento VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    Alias VARCHAR(5) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS ROL (
    idRol BIGINT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS PROFESOR_ROL (
    IdProfesor BIGINT NOT NULL,
    IdRol BIGINT NOT NULL,
    GrupoTutoria VARCHAR(20),
    PRIMARY KEY (IdProfesor, IdRol),
    FOREIGN KEY (IdProfesor) REFERENCES PROFESOR(IdProfesor),
    FOREIGN KEY (IdRol) REFERENCES ROL(IdRol)
);

CREATE TABLE IF NOT EXISTS HORARIOSPROFESOR (
    IdHorario BIGINT AUTO_INCREMENT PRIMARY KEY,
    IdProfesor BIGINT NOT NULL,
    Grupo VARCHAR(20) NOT NULL,
    Profesor VARCHAR(5) NOT NULL,
    Asignatura VARCHAR(20) NOT NULL,
    Aula VARCHAR(20),
    Dia INT(1) NOT NULL,
    Hora INT(1) NOT NULL,
    Curso INT(4) NOT NULL,
    FOREIGN KEY (IdProfesor) REFERENCES PROFESOR(IdProfesor)
);

CREATE TABLE IF NOT EXISTS AUSENCIASPROFESOR (
    IdAusencia BIGINT AUTO_INCREMENT PRIMARY KEY,
    IdHorario BIGINT NOT NULL,
    IdProfesorAusente BIGINT NOT NULL,
    FechaAusencia DATE NOT NULL,
    Comentario VARCHAR(255),
    Tarea LONGTEXT,
    Fichero BLOB,
    FOREIGN KEY (IdHorario) REFERENCES HORARIOSPROFESOR(IdHorario),
    FOREIGN KEY (IdProfesorAusente) REFERENCES PROFESOR(IdProfesor)
);


CREATE TABLE IF NOT EXISTS GUARDIA (
    IdGuardia BIGINT AUTO_INCREMENT PRIMARY KEY,
    IdAusencia BIGINT NOT NULL,
    IdProfesorGuardia BIGINT NOT NULL,
    Grupo VARCHAR(20) NOT NULL,
    Tramo INT(1) NOT NULL,
    Duracion INT(10) NOT NULL,
    FOREIGN KEY (IdAusencia) REFERENCES AUSENCIASPROFESOR(IdAusencia),
    FOREIGN KEY (IdProfesorGuardia) REFERENCES PROFESOR(IdProfesor)
);



-- INSERCIÓN DE DATOS DE PRUEBA
INSERT INTO PROFESOR (DNIProfesor, NombreProfesor, ClaveProfesor, Usuario, CursoAcademico, NombreDepartamento, email, Alias)
VALUES 
('48878932E','Morales Pacheco, Ramón Javier','48878932E','rmorpac932',2024,'Informática','ramon_javier.morales@iesalmudeyne.es','INF08'),
('30215880R','Dato Doblas, Eduardo','30215880R','edatdob880',2024,'Informática','eduardo.dato@iesalmudeyne.es','INF03'),
('45001720P','Campos Blancos, Clara','45001720P','ccambla720',2024,'Informática','clara.campos@iesalmudeyne.es','INF06');

INSERT INTO ROL (rol) 
VALUES ('Coordinador TIC'), ('Equipo Directivo'), ('Profesor');

INSERT INTO PROFESOR_ROL (IdProfesor, IdRol, GrupoTutoria) VALUES 
(1, 1, ''),
(1, 2, ''),
(1, 3, '1SMR A'),
(2, 3, '1DAW'),
(3, 3, '2DAW');

INSERT INTO HORARIOSPROFESOR (IdProfesor, Grupo, Profesor, Asignatura, Aula, Dia, Hora, Curso) VALUES
(1,'2º DAW','INF08','CLIENTE','DAW',1,4,2024),
(1,'2º DAW','INF08','CLIENTE','2DAW',1,3,2024),
(1,'2º DAW','INF08','CLIENTE','2DAW',1,5,2024),
(1,'2º DAW','INF08','CLIENTE','2DAW',3,3,2024),
(1,'2º DAW','INF08','CLIENTE','2DAW',3,4,2024),
(1,'2º DAW','INF08','CLIENTE','2DAW',3,5,2024),
(1,'2º DAW','INF08','CLIENTE','2DAW',3,6,2024),
(1,'2º DAW','INF08','CLIENTE','2DAW',4,2,2024),
(1,'2º DAW','INF08','CLIENTE','2DAW',4,3,2024),
(1,'2º DAW','INF08','CLIENTE','2DAW',4,4,2024),
(2,'2º DAW','INF03','SERVIDOR','2DAW',1,1,2024),
(2,'2º DAW','INF03','SERVIDOR','2DAW',1,2,2024),
(2,'2º DAW','INF03','SERVIDOR','2DAW',2,2,2024),
(2,'2º DAW','INF03','SERVIDOR','2DAW',4,1,2024),
(2,'2º DAW','INF03','SERVIDOR','2DAW',5,2,2024),
(2,'2º DAW','INF03','SERVIDOR','2DAW',5,3,2024),
(2,'2º DAW','INF03','SERVIDOR','2DAW',5,4,2024),
(3,'2º DAW','INF06','DESPLIEGUE','2DAW',2,3,2024),
(3,'2º DAW','INF06','DESPLIEGUE','2DAW',3,1,2024),
(3,'2º DAW','INF06','DESPLIEGUE','2DAW',3,2,2024);