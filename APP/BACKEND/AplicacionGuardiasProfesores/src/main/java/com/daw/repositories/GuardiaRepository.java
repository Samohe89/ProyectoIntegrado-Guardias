package com.daw.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.daw.datamodel.entities.Guardia;
import com.daw.dto.ProfesorTotalHorasGuardiaDTO;

public interface GuardiaRepository extends JpaRepository<Guardia, Long> {

	// Consulta que obtiene total de horas de guardia por profesor
	@Query("SELECT new com.daw.dto.ProfesorTotalHorasGuardiaDTO(g.profesor.id, g.profesor.nombreProfesor, SUM(g.duracion) / 60.0) "
			+
			"FROM Guardia g GROUP BY g.profesor.id, g.profesor.nombreProfesor")
	List<ProfesorTotalHorasGuardiaDTO> obtenerTotalHorasPorProfesor();

	@Query("SELECT g FROM Guardia g "
			+ "WHERE g.ausenciasProfesor.id = :idAusencia "
			+ "ORDER BY g.tramo")
	List<Guardia> findGuardiasPorIdAusencias(@Param("idAusencia") Long idAusencia);

}
