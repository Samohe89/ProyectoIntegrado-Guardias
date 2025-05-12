package com.daw.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daw.datamodel.entities.ProfesorRol;

public interface ProfesorRolRepository extends JpaRepository<ProfesorRol, Long> {

	ProfesorRol findByProfesorIdDniProfesorAndIdCursoAcademicoAndIdRol(String dniProfesor, String cursoAcademico, String rol);
	
}
