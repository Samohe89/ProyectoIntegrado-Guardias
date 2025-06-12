package com.daw.repositories;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daw.datamodel.entities.Ausencia;

public interface AusenciaRepository extends JpaRepository<Ausencia, Long> {
	
	//Método para comprobar si existe una ausencia para un profesor, fecha y registro
	boolean existsByProfesorIdDniProfesorAndProfesorIdCursoAcademicoAndFechaAusenciaAndHorariosProfesorNumRegistro(
		    String dniProfesor,
		    String cursoAcademico,
		    LocalDate fechaAusencia,
		    Integer numRegistro
		);


}
