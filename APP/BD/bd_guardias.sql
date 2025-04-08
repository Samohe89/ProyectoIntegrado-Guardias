-- CREACIÓN DE BASE DE DATOS
CREATE DATABASE IF NOT EXISTS app_guardias;
USE app_guardias;

-- CREACIÓN DE TABLAS
CREATE TABLE IF NOT EXISTS PROFESOR (
    DNIProfesor VARCHAR(10) NOT NULL,
    cursoAcademico INT(4) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(15) NOT NULL,
    clave VARCHAR(25) NOT NULL,
    alias VARCHAR(5) UNIQUE,
    departamento VARCHAR(50),
    email VARCHAR(100),
    PRIMARY KEY (DNIProfesor, cursoAcademico)
);

CREATE TABLE IF NOT EXISTS ROL (
    rol VARCHAR(50) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS PROFESOR_ROL (
    DNIProfesor VARCHAR(10) NOT NULL,
    cursoAcademico INT(4) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    grupoTutoria VARCHAR(20),
    PRIMARY KEY (DNI, cursoAcademico, rol),
    FOREIGN KEY (DNI, cursoAcademico) REFERENCES PROFESOR(DNIProfesor, cursoAcademico),
    FOREIGN KEY (rol) REFERENCES ROL(rol)
);

CREATE TABLE IF NOT EXISTS HORARIO (
    numRegistro BIGINT AUTO_INCREMENT PRIMARY KEY,
    DNIProfesor VARCHAR(10) NOT NULL,
    cursoAcademico INT(4) NOT NULL,
    grupo VARCHAR(20) NOT NULL,
    asignatura VARCHAR(20) NOT NULL,
    aula VARCHAR(20),
    dia INT(1) NOT NULL,
    hora INT(1) NOT NULL,
    FOREIGN KEY (DNIProfesor, cursoAcademico) REFERENCES PROFESOR(DNIProfesor, cursoAcademico)
);

CREATE TABLE IF NOT EXISTS AUSENCIA (
    IDAusencia BIGINT AUTO_INCREMENT PRIMARY KEY,
    IDHorario BIGINT NOT NULL,
    IDProfesorAusente VARCHAR(10) NOT NULL,
    cursoAcademico INT(4) NOT NULL,
    fecha DATE NOT NULL,
    motivo VARCHAR(255),
    tarea LONGTEXT,
    fichero BLOB,
    FOREIGN KEY (IDHorario) REFERENCES HORARIO(NumRegistro),
    FOREIGN KEY (IDProfesorAusente, cursoAcademico) REFERENCES PROFESOR(DNIProfesor, cursoAcademico)
);


CREATE TABLE IF NOT EXISTS GUARDIA (
    IDGuardia BIGINT AUTO_INCREMENT PRIMARY KEY,
    IDAusencia BIGINT NOT NULL,
    IDProfesorGuardia VARCHAR(10) NOT NULL,
    cursoAcademico INT(4) NOT NULL,
    grupo VARCHAR(20) NOT NULL,
    duracion INT(10) NOT NULL,
    FOREIGN KEY (IDAusencia) REFERENCES AUSENCIA(IDAusencia),
    FOREIGN KEY (IDProfesorGuardia, cursoAcademico) REFERENCES PROFESOR(DNIProfesor, cursoAcademico)
);


