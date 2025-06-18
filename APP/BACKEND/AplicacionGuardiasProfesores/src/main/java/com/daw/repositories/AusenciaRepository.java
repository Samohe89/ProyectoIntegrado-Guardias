package com.daw.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.daw.datamodel.entities.Ausencia;

public interface AusenciaRepository extends JpaRepository<Ausencia, Long> {
	
	//Método para comprobar si existe una ausencia para un profesor, fecha y registro
	boolean existsByProfesorIdDniProfesorAndProfesorIdCursoAcademicoAndFechaAusenciaAndHorariosProfesorNumRegistro(
		    String dniProfesor,
		    String cursoAcademico,
		    LocalDate fechaAusencia,
		    Integer numRegistro
		);
	
	/* 
	Consultar ausencias por fecha, ordenadas por hora de clase, como primer criterio
	y por grupo, como segundo criterio
	*/
	@Query("SELECT a FROM Ausencia a "
			+ "WHERE a.fechaAusencia = :fecha "
			+ "ORDER BY a.horariosProfesor.hora ASC, "
			+ "a.horariosProfesor.grupo ASC")
	List<Ausencia> findByFechaOrdenPorHora(@Param("fecha") LocalDate fecha);
	
	
	/* 
	Consultar ausencias entre fechas, ordenadas por fecha, como primer criterio,
	por hora de clase, como segundo criterio  por grupo, como tercer criterio
	*/
	@Query("SELECT a FROM Ausencia a "
			+ "WHERE a.fechaAusencia BETWEEN :fechaDesde AND :fechaHasta "
			+ "ORDER BY a.fechaAusencia ASC, "
			+ "a.horariosProfesor.hora ASC, "
			+ "a.horariosProfesor.grupo ASC")
	List<Ausencia> findByFechasOrdenPorFechaYHora(
			@Param("fechaDesde") LocalDate fechaDesde, 
			@Param("fechaHasta") LocalDate fechaHasta);


	/* 
	Consultar ausencias por profesor, ordenadas por fecha, como primer criterio,
	por hora de clase, como segundo criterio  por grupo, como tercer criterio
	*/	
	@Query("SELECT DISTINCT a FROM Ausencia a " +
	           "JOIN a.guardiasProfesores g " +
	           "JOIN g.profesor p " +
	           "WHERE p.nombreProfesor = :nombreProfesorGuardia " +
	           "ORDER BY a.fechaAusencia ASC, " +
	           "a.horariosProfesor.hora ASC, " +
	           "a.horariosProfesor.grupo ASC")
	List<Ausencia> findByProfesorGuardiaOrdenPorFechaYHora(
	    	@Param("nombreProfesorGuardia") String nombreProfesorGuardia);
	

	/* 
	Consultar ausencias por profesor y entre fechas, ordenadas por fecha, como primer criterio,
	por hora de clase, como segundo criterio  por grupo, como tercer criterio
	*/	
    @Query("SELECT DISTINCT a FROM Ausencia a " +
           "JOIN a.guardiasProfesores g " +
           "JOIN g.profesor p " +
           "WHERE a.fechaAusencia BETWEEN :fechaDesde AND :fechaHasta " +
           "AND p.nombreProfesor = :nombreProfesorGuardia " +
           "ORDER BY a.fechaAusencia ASC, " +
           "a.horariosProfesor.hora ASC, " +
           "a.horariosProfesor.grupo ASC")
    List<Ausencia> findByFechasYProfesorGuardiaOrdenPorFechaYHora(
            @Param("fechaDesde") LocalDate fechaDesde,
            @Param("fechaHasta") LocalDate fechaHasta,
            @Param("nombreProfesorGuardia") String nombreProfesorGuardia);
}
	

