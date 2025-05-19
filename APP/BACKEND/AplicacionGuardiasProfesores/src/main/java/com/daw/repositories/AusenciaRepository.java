package com.daw.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.daw.datamodel.entities.Ausencia;

public interface AusenciaRepository extends JpaRepository<Ausencia, Long> {
	
	/* 
	Consultar ausencias por fecha, ordenadas por hora de clase, como primer criterio
	y por grupo, como segundio criterio
	*/
	@Query("SELECT a FROM Ausencia a "
			+ "WHERE a.fechaAusencia = :fecha "
			+ "ORDER BY a.horariosProfesor.hora ASC, "
			+ "a.horariosProfesor.grupo ASC")
	List<Ausencia> findByFechaOrdenPorHora(@Param("fecha") LocalDate fecha);

}
