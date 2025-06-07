package com.daw.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.daw.datamodel.entities.Guardia;
import com.daw.dto.ProfesorTotalHorasGuardiaDTO;

public interface GuardiaRepository extends JpaRepository<Guardia, Long> {

	// Consulta que obtiene total de horas de guardia por profesor
//	@Query("SELECT new com.daw.dto.ProfesorTotalHorasGuardiaDTO(g.profesor.id, g.profesor.nombreProfesor, SUM(g.duracion) / 60.0) "
//			+
//			"FROM Guardia g GROUP BY g.profesor.id, g.profesor.nombreProfesor")
//	List<ProfesorTotalHorasGuardiaDTO> obtenerTotalHorasPorProfesor();
	
	//Query para DNI (perfil profesor)
	@Query("SELECT new com.daw.dto.ProfesorTotalHorasGuardiaDTO(g.profesor.id, g.profesor.nombreProfesor, SUM(g.duracion) / 60.0) " +
		       "FROM Guardia g " +
		       "WHERE (:fechaDesde IS NULL OR g.ausenciasProfesor.fechaAusencia >= :fechaDesde) " +
		       "AND (:fechaHasta IS NULL OR g.ausenciasProfesor.fechaAusencia <= :fechaHasta) " +
		       "AND (:dniProfesor IS NULL OR LOWER(TRIM(g.profesor.id.dniProfesor)) = LOWER(TRIM(:dniProfesor))) " +
		       "GROUP BY g.profesor.id, g.profesor.nombreProfesor")
		List<ProfesorTotalHorasGuardiaDTO> obtenerTotalHorasPorDni(
		    @Param("fechaDesde") LocalDate fechaDesde,
		    @Param("fechaHasta") LocalDate fechaHasta,
		    @Param("dniProfesor") String dniProfesor);
	
	//Query para nombre (filtro del directivo)
	@Query("SELECT new com.daw.dto.ProfesorTotalHorasGuardiaDTO(g.profesor.id, g.profesor.nombreProfesor, SUM(g.duracion) / 60.0) " +
		       "FROM Guardia g " +
		       "WHERE (:fechaDesde IS NULL OR g.ausenciasProfesor.fechaAusencia >= :fechaDesde) " +
		       "AND (:fechaHasta IS NULL OR g.ausenciasProfesor.fechaAusencia <= :fechaHasta) " +
		       "AND (:nombreProfesor IS NULL OR LOWER(TRIM(g.profesor.nombreProfesor)) = LOWER(TRIM(:nombreProfesor))) " +
		       "GROUP BY g.profesor.id, g.profesor.nombreProfesor")
		List<ProfesorTotalHorasGuardiaDTO> obtenerTotalHorasPorNombre(
		    @Param("fechaDesde") LocalDate fechaDesde,
		    @Param("fechaHasta") LocalDate fechaHasta,
		    @Param("nombreProfesor") String nombreProfesor);

	@Query("SELECT g FROM Guardia g "
			+ "WHERE g.ausenciasProfesor.id = :idAusencia "
			+ "ORDER BY g.tramo")
	List<Guardia> findGuardiasPorIdAusencias(@Param("idAusencia") Long idAusencia);

}
