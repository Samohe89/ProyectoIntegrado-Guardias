package com.daw.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daw.datamodel.entities.ProfesorRol;
import com.daw.datamodel.entities.ProfesorRolId;

public interface ProfesorRolRepository extends JpaRepository<ProfesorRol, ProfesorRolId> {

	ProfesorRol findByProfesorIdDniProfesorAndIdCursoAcademicoAndIdRol(String dniProfesor, String cursoAcademico, String rol);
	
}
