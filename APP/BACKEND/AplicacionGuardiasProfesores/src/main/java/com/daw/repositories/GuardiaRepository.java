package com.daw.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.daw.datamodel.entities.Guardia;

public interface GuardiaRepository extends JpaRepository<Guardia, Long>{
	
	@Query("SELECT g FROM Guardia g "
			+ "WHERE g.ausenciasProfesor.id = :idAusencia "
			+ "ORDER BY g.tramo")
	List<Guardia> findGuardiasPorIdAusencia(@Param("idAusencia") Long idAusencia);
	
	



}
