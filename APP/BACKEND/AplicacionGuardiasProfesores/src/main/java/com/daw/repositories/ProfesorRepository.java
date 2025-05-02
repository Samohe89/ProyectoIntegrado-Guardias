package com.daw.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daw.datamodel.entities.DniProfesorCursoAcademicoId;
import com.daw.datamodel.entities.Profesor;

public interface ProfesorRepository extends JpaRepository<Profesor, DniProfesorCursoAcademicoId>{

}
